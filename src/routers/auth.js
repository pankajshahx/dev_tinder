const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    const { firstName, lastName, email, password } = req.body;

    const hasPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

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
    res.cookie("token", token);
    res.json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send("Invalid credentials");
  }
});

authRouter.get("/signout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("User logged out successfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

authRouter.patch("/restPassword", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }
    const isPassWordValid = await user.validatePassword(oldPassword);
    if (!isPassWordValid) {
      return res.status(400).send("Invalid Credentials");
    }

    const newHasPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHasPassword;
    await user.save();
    res.json({
      message: `${user.firstName} your password updated successfully`,
      data: user,
    });
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});
module.exports = authRouter;
