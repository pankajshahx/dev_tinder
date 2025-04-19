const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://namasteNode:pNfDSR5FLWOje20Q@nodejsexperiment.rdd5l.mongodb.net/devTinder?retryWrites=true&w=majority&appName=nodejsexperiment",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
