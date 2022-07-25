const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    max: 500,
  },
  img: {
    type: Buffer,
  },
  img_path: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
