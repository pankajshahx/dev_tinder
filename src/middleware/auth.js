const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = async (req, res, next) => {
  console.log("Admin Middleware");
  isAuthorized = true;
  if (!isAuthorized) {
    res.status(401).send("Not authorized to access the data");
  } else {
    next();
  }
};
const userAuth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const { token } = req.cookies;
    console.log("Token:", token);

    if (!token) {
      return res.status(401).send("Not authorized to access the data");
    }

    const decodedData = jwt.verify(token, "DEV@TINDER2020");
    console.log("Decoded Data:", decodedData);

    const { _id } = decodedData;
    console.log("ID:", _id);

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(401)
        .send("Not authorized to access the data. Sign in first!");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication Error:", err.message);
    return res
      .status(401)
      .send("Invalid or expired token. Please log in again." + err);
  }
};
module.exports = { adminAuth, userAuth };
