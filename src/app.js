const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("Hello User");
});

app.post("/user", (req, res) => {
  res.send("Saved Data Successfully");
});

app.listen(3000, () => {
  console.log("server started successfully on port 3000...");
});
