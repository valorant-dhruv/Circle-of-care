const express = require("express");
const authroute = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const handlingerror = require("./errors");
const cors = require("cors");

authroute.use(cors());

//This is the router for registering the user in our database if the user is a new user
authroute.post("/register", async (req, res) => {
  let found = await User.findOne({ email: req.body.email });
  if (found) {
    res.send("The user is already registered please sign in");
  } else {
    try {
      //Hash the password using the bcrypt library
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(req.body.password, salt);

      //Create and save the user
      let user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedpassword,
      });

      console.log(user);

      res.status(200).json(user);
    } catch (err) {
      let str = handlingerror(err);
      res.send(str);
      console.log(err);
    }
  }
});

authroute.post("/login", async (req, res) => {
  //Checking if the user email exists or not
  let user = await User.findOne(
    { email: req.body.email },
    { validator: false }
  );
  if (!user) {
    res.status(200).send("404! User is not found");
  } else {
    //If email if found compare the password that user entered vs the password present in the database
    //The compare function returns true or false
    let validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) {
      res.status(200).send("Invalid email or password");
    } else {
      res.status(200).json(user);
    }
  }
});

module.exports = authroute;
