const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors());
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
// const exampleRouter = require("./routers/example");
const connectionRequestRouter = require("./routers/connectionRequest");
const userRouter = require("./routers/user");

app.use("/", authRouter);
app.use("/", profileRouter);
// app.use("/", exampleRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3333, () => {
      console.log("server started successfully on port 3333...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
