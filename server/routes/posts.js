const express = require("express");
const postrouter = express.Router();
const Post = require("../models/Posts");
const User = require("../models/User");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const handlingerror = require("./errors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
postrouter.use(cors());

// ./uploads/${req.file.filename}

//Creating a new post
postrouter.post("/", upload.single("file"), async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  // console.log(req.file.path);
  console.log("Executed before the error");
  const myimage = fs.readFileSync(`./uploads/${req.file.filename}`);
  fs.writeFileSync(
    "C:UsersBhaskarDesktopReact-projectssocial_media_appclient",
    myimage
  );

  console.log(myimage);

  try {
    let post = await Post.create({
      userId: req.body.userId,
      desc: req.body.desc,
      img: myimage,
      img_path: req.file.path,
    });
    // console.log(myimage);
    console.log(post);
    console.log("The post object is made");
    res.status(200).json(post);
  } catch (err) {
    let str = handlingerror(err);
    res.status(404).send(err);
  }
});

//Updating a post
postrouter.put("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.send("The post is not found");
    } else {
      if (req.params.id === req.body.userId) {
        let newpost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json(newpost);
      } else {
        res.status(403).send("You can only update your own post");
      }
    }
  } catch (err) {
    res.json(err);
  }
});

//Deleting a post
postrouter.delete("/:id", async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).send("The post is not found");
  } else {
    if (req.body.userId === req.params.id) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send("The post has been deleted");
    } else {
      res.status(404).send("You can only delete your own post");
    }
  }
});

//Like or unlike a post
postrouter.put("/:id/like", async (req, res) => {
  try {
    let userB = await Post.findById(req.params.id);
    let likesarray = userB.likes;
    if (likesarray.includes(req.body.userId)) {
      likesarray = likesarray.filter((ele) => {
        return ele != req.body.userId;
      });
      try {
        await Post.findByIdAndUpdate(req.params.id, { likes: likesarray });
        res.send("The user has been unliked");
      } catch (err) {
        res.send(err);
      }
    } else {
      likesarray.push(req.body.userId);
      try {
        await Post.findByIdAndUpdate(req.params.id, { likes: likesarray });
        res.send("The user has been liked");
      } catch (err) {
        res.send(err);
      }
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

//Get a single post
postrouter.get("/:id", async (req, res) => {
  try {
    let post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      res.send("The post is not found");
    } else {
      console.log(post);
      const image = fs.readFileSync(
        "./uploads/Screenshot 2022-04-01 125446.png"
      );
      console.log(image);
      res.json(post);
    }
  } catch (err) {
    res.send(err);
  }
});

//Getting all the posts in a user's timeline
postrouter.post("/timeline/all", async (req, res) => {
  try {
    //First we will find the user in the User section
    let user = await User.findById(req.body.userId);

    //Now we will get all the posts of that user in the form of the array
    let userposts = await Post.find({ userId: req.body.userId });

    //Now we will get all the posts of the user that our user is following
    let friendsposts = await Promise.all(
      user.followings.map((friendid) => {
        return Post.find({ userId: friendid });
      })
    );

    let posts = [];
    let finalposts = posts.concat(...friendsposts);
    res.json(finalposts);
  } catch (err) {
    res.send(err);
  }
});

//Get all the user posts only
postrouter.post("/timeline/single", async (req, res) => {
  try {
    //First we will find the user in the User section
    let user = await User.findById(req.body.userId);
    console.log(user);

    //Now we will get all the posts of that user in the form of the array
    let userposts = await Post.find({ userId: req.body.userId });
    console.log(userposts);
    let finalposts = userposts;
    res.json(finalposts);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = postrouter;
