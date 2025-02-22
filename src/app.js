const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Hello hello good morning!");
});
app.use("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(3000, () => {
  console.log("server started successfully on port 3000...");
});
