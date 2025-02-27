const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const profileRouter = express.Router();

profileRouter.use("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});
profileRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

module.exports = profileRouter;
