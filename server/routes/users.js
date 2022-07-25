const express = require("express");
const userrouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

userrouter.get("/", (req, res) => {
  res.send("Welcome to the user router");
});

//Updating the user
//As this route is for updating the user we are using the put function
userrouter.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    //This means that real user wants to update their data in the database
    //Now the body that the user sends contains the parameters that needs to be updated
    //For example if the user sends {id:4,password:"dhru"} this means that for the user 4 id password field needs to be updated to dhru

    //If the user wishes to update the password the password would be hashed before updating the database
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.json(err);
      }
    }

    await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          res.json(err);
        } else {
          res.status(200).send("The account has been updated");
        }
      }
    );
  } else {
    res.send("The user can only be updated by himself/herself only");
  }
});

//Deleting the user
userrouter.delete("/:id", async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    await User.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.status(200).send("The account has been deleted");
      }
    });
  } else {
    res.send("The user can only delete their account");
  }
});

//Getting the information about the user
userrouter.get("/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.send("The user you are searching for is not found");
  }
});

//Getting the info about all the followers of the user
userrouter.get("/followers/:id", async (req, res) => {
  let data;
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.send("User is not found");
    } else {
      // new Promise((reject, resolve) => {
      //   data = user.followings.map(async (ele) => {
      //     console.log(ele);
      //     let data2 = await User.findById(ele);
      //     console.log(data2);
      //     return data2;
      //   });
      //   resolve();
      // }).then(() => {
      //   res.json(data);
      // });

      let promise = user.followings.map(async (ele) => {
        console.log(ele);
        let data2 = await User.findById(ele);
        return data2;
      });

      Promise.all(promise).then((results) => {
        console.log(results);
        res.json(results);
      });
    }
  } catch (err) {
    res.send(err);
  }
});

//Follow a user
userrouter.post("/:id/follow", async (req, res) => {
  if (req.params.id != req.body.id) {
    console.log("1");
    let user1 = await User.findById(req.body.id);
    console.log("2");
    console.log(req.params);
    let user2 = await User.findById(req.params.id);
    console.log("3");
    if (user1.followings.includes(req.params.id)) {
      res.status(400).send("The user alreay follows the other user");
    } else {
      console.log(user1.followings);
      console.log(user2.followers);

      let user1following = [...user1.followings, req.params.id];
      let user2followers = [...user2.followers, req.body.id];

      console.log(user1following);
      await User.findByIdAndUpdate(req.params.id, {
        followers: user2followers,
      });
      await User.findByIdAndUpdate(req.body.id, { followings: user1following });

      res.status(200).send("The user has been followed");
    }
  } else {
    res.status(400).send("The user cannot follow itself!");
  }
});
//Unfollow the user
userrouter.get("/:id/unfollow", async (req, res) => {
  if (req.params.id != req.body.id) {
    let user1 = await User.findById(req.body.id);
    let user2 = await User.findById(req.params.id);
    if (!user1.followings.includes(req.params.id)) {
      res.send("The user doesn't follow the other account");
    } else {
      console.log(user1.followings);
      console.log(user2.followers);

      let user1following = user1.followings.filter((data) => {
        return data != req.params.id;
      });
      let user2followers = user2.followers.filter((data) => {
        return data != req.body.id;
      });

      console.log(user1following);
      await User.findByIdAndUpdate(req.params.id, {
        followers: user2followers,
      });
      await User.findByIdAndUpdate(req.body.id, { followings: user1following });

      res.status(200).send("The user has been unfollowed");
    }
  } else {
    res.status(404).send("The user cannot unfollow itself");
  }
});

module.exports = userrouter;
