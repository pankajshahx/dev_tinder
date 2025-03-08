const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/ConnectionRequest");

const userRouter = express.Router();
const USER_DATA = "firstName lastName age gender photo_url skills";
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

module.exports = userRouter;
