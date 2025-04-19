const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");

const userRouter = express.Router();
const USER_DATA = "firstName lastName age gender photoUrl about skills";
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_DATA);

    res.json({ message: "Received Requests", data: connectionRequests });
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    const updatedData = connectionRequests.map((request) => {
      if (request.fromUserId._id.equals(loggedInUser._id)) {
        return request.toUserId;
      }
      return request.fromUserId;
    });

    res.json({ message: "Connections", data: updatedData });
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.toUserId);

      hideUsersFromFeed.add(request.fromUserId);
    });

    const users = await User.find({
      _id: { $nin: [...hideUsersFromFeed, loggedInUser._id] },
    })
      .select(USER_DATA)
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({ message: "Feed", data: users });
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

module.exports = userRouter;
