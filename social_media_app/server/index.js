//We have imported the express package here
//The express package is both a function as well as an object
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userrouter = require("./routes/users");
const authrouter = require("./routes/auth");
const postrouter = require("./routes/posts");

const mongoose = require("mongoose");
const authroute = require("./routes/auth");
dotenv.config();

//The mongoose.connect function returns a resolved or rejected promise
mongoose
  .connect(process.env.MONGO_ATLAS, { useNewUrlParser: true })
  .then(() => {
    console.log("The database is connected successfully");
  })
  .catch((err) => {
    console.log("An error has occured");
    console.log(err);
  });

//Now we are creating a server object out of thr express package
//Here we are calling the express function which is returning an express package here
const app = express();

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userrouter);
app.use("/api/auth", authrouter);
app.use("/api/posts", postrouter);

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

//Hence a server is created and we are listening the server on the port mentioned here
const PORT = process.env.PORT || 3000;
//The server is listening
//The app object has a function listen which accepts two paramters:
//1)The port on which the server is listening and 2)The callback function which is called when the server is started
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
