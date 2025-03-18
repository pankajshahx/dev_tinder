const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const { validateProfileEditData } = require("../utils/validateProfileEditData");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      message: "User Profile",
      data: user,
    });
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //validate the request
    const isAllowed = validateProfileEditData(req);

    if (!isAllowed) {
      return res.status(400).send("Invalid Data");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});
// profileRouter.get("/feed", userAuth, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(500).send("Something went wrong" + err);
//   }
// });

module.exports = profileRouter;
