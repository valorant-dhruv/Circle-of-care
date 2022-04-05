const express = require("express");
const postrouter = express.Router();
const Post = require("../models/Posts");

//Creating a new post
postrouter.post("/", async (req, res) => {
  try {
    let post = await Post.create({
      userId: req.body.userId,
      desc: req.body.desc,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
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
module.exports = postrouter;
