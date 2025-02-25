const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Password is required"],
      validate: (value) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },
    age: {
      type: Number,
      min: [18, "Age should be greater than 18"],
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
    },
    skills: {
      type: [String],
      required: function () {
        return this.age && this.age > 25;
      },
    },
  },
  { timestamps: true, strict: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
