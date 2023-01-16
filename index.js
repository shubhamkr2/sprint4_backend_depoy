const express = require("express");
const { connection } = require("mongoose");
const { userRouter } = require("./route/user.route");
const { postRouter } = require("./route/post.route");
const app = express();
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("App Home Page");
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Something went wrong due to: ${err}`);
  }
  console.log({ "Server listening on port": process.env.PORT });
});
