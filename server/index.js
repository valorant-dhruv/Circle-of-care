//We have imported the express package here
//The express package is both a function as well as an object
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userrouter = require("./routes/users");
const authrouter = require("./routes/auth");
const postrouter = require("./routes/posts");
const cors = require("cors");
const imagerouter = require("./routes/images");
const path = require("path");
const User = require("./models/User");
const conversationrouter = require("./routes/conversation");
const messagesrouter = require("./routes/message");

const mongoose = require("mongoose");
const authroute = require("./routes/auth");
dotenv.config();

//The mongoose.connect function returns a resolved or rejected promise
mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("common"));
app.use(cors());
app.use("/api/users", userrouter);
app.use("/api/auth", authrouter);
app.use("/api/posts", postrouter);
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/conversations", conversationrouter);
app.use("/messages", messagesrouter);

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.get("/searchuser/:name", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.name });
    if (!user) {
      console.log("Not found");
      res.send("Not Found");
    } else {
      console.log("Found");
      res.json(user);
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

//Hence a server is created and we are listening the server on the port mentioned here
const PORT = process.env.PORT || 3000;
//The server is listening
//The app object has a function listen which accepts two paramters:
//1)The port on which the server is listening and 2)The callback function which is called when the server is started
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
