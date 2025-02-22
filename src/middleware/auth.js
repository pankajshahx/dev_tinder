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
  console.log("User Middleware");
  isAuthorized = false;
  if (!isAuthorized) {
    res.status(401).send("Not authorized to access the data");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
