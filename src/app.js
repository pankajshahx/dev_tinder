const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//   res.send("Send all the data");
// });
// app.get("/admin/deleteUser", (req, res) => {
//   res.send("Deleted the user successfully");
// });

// app.get("/user/getAllData", userAuth, (req, res) => {
//   res.send("Send all the data");
// });
// app.get("/user/deleteUser", userAuth, (req, res) => {
//   res.send("Deleted the user successfully");
// });

// app.get("/user/data", (req, res, next) => {
//   try {
//     throw new Error("Error occurred");
//     res.send("User Data");
//   } catch (err) {
//     res.status(500).send("Something went wrong in user Data");
//   }
// });

// app.use("/", (err, req, res, next) => {
//   console.log(err);
//   if (err) {
//     res.status(500).send("Something went wrong");
//   }
// });
app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const users = await User.findOne({ email: email });
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const ALLOWED_DATA = [
    "firstName",
    "lastName",
    "email",
    "password",
    "age",
    "gender",
  ];
  const receivedData = Object.keys(req.body);
  const isValidOperation = receivedData.every((data) =>
    ALLOWED_DATA.includes(data)
  );
  if (!isValidOperation) {
    return res.status(400).send("Invalid data formate");
  }

  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const update = req.body;
  try {
    await User.findByIdAndUpdate(userId, update, { runValidators: true });
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Something went wrong" + err);
  }
});

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
