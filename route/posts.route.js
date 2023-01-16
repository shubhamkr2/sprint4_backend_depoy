const express = require("express");
const { PostModel } = require("../model/post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const query = req.params.query;
  const posts = await PostModel.find({ query });
  res.status(200).send(posts);
});


module.exports = { postRouter };
