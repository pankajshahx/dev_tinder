const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("This is the first Response");
    next();
  },
  (req, res, next) => {
    console.log("This is the second Response");
    next();
  },
  (req, res, next) => {
    console.log("This is the third Response");
    res.send("response 3");
  }
);

app.listen(3000, () => {
  console.log("server started successfully on port 3000...");
});
