const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
});

const PostModel = mongoose.model("User", postSchema);

module.exports = { PostModel };
