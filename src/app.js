const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const exampleRouter = require("./routers/example");
const connectionRequestRouter = require("./routers/connectionRequest");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", exampleRouter);
app.use("/", connectionRequestRouter);

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
