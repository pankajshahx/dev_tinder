const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/user");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    console.log("send connection request");
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status");
      }

      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingRequest) {
        return res.status(400).send("Request already exists");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send("User not found");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      console.log(data);
      res.json({ message: "Connection Request Sent", data });
    } catch (err) {
      res.status(500).send("Something went wrong" + err);
    }
  }
);
module.exports = connectionRequestRouter;
