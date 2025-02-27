const express = require("express");
const { userAuth } = require("../middleware/auth");
const exampleRouter = express.Router();

exampleRouter.use("/admin", userAuth);

exampleRouter.get("/admin/getAllData", (req, res) => {
  res.send("Send all the data");
});
exampleRouter.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted the user successfully");
});

exampleRouter.get("/user/getAllData", userAuth, (req, res) => {
  res.send("Send all the data");
});
exampleRouter.get("/user/deleteUser", userAuth, (req, res) => {
  res.send("Deleted the user successfully");
});

exampleRouter.get("/user/data", (req, res, next) => {
  try {
    throw new Error("Error occurred");
    res.send("User Data");
  } catch (err) {
    res.status(500).send("Something went wrong in user Data");
  }
});

exampleRouter.use("/", (err, req, res, next) => {
  console.log(err);
  if (err) {
    res.status(500).send("Something went wrong");
  }
});
exampleRouter.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const users = await User.findOne({ email: email });
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

exampleRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

exampleRouter.patch("/user/:userId", userAuth, async (req, res) => {
  const userId = req?.params?.userId;
  const update = req.body;
  try {
    const ALLOWED_DATA = ["firstName", "lastName", "age", "gender", "skills"];
    const receivedData = Object.keys(req.body);
    const isValidOperation = receivedData.every((data) =>
      ALLOWED_DATA.includes(data)
    );
    if (!isValidOperation) {
      return res.status(400).send("Invalid data formate");
    }
    await User.findByIdAndUpdate(userId, update, { runValidators: true });
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

module.exports = exampleRouter;
