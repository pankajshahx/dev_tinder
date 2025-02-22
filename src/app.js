const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Send all the data");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted the user successfully");
});

app.get("/user/getAllData", userAuth, (req, res) => {
  res.send("Send all the data");
});
app.get("/user/deleteUser", userAuth, (req, res) => {
  res.send("Deleted the user successfully");
});
app.listen(3000, () => {
  console.log("server started successfully on port 3000...");
});
