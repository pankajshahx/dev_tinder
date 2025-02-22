const mongoose = require("mongoose");

connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namasteNode:pNfDSR5FLWOje20Q@nodejsexperiment.rdd5l.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
