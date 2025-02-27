const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    const { firstName, lastName, email, password } = req.body;
    const hasPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hasPassword,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

authRouter.post("/signin", async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }
    const isPassWordValid = await user.validatePassword(password);
    console.log(isPassWordValid);
    console.log(user);
    if (!isPassWordValid) {
      return res.status(400).send("Invalid Credentials");
    }
    const token = await user.getJWTToken();
    console.log(token);
    res.cookie("token", token);
    res.send("User logged in successfully");
  } catch (err) {
    res.status(500).send("Invalid credentials");
  }
});
module.exports = authRouter;
