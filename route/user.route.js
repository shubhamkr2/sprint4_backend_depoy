const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.get("/", (req, res) => {
  res.send("hello");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      if (hash) {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hash,
        });

        await user.save();
        // console.log(user);
        res.status(201).send("Registration Successful");
      } else {
        console.log(err);
        res.status(500).send("Registration Failed");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Registration Failed");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.KEY);
          res.status(201).send("Login Successful");
        } else {
          res.status(500).send("Login Failed");
        }
      });
    } else {
      res.status(500).send("Login Failed");
    }
  } catch (err) {
    console.log(err);
    res.send("Login Failed");
  }
});

module.exports = { userRouter };
