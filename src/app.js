const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const exampleRouter = require("./routers/example");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", exampleRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("server started successfully on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
