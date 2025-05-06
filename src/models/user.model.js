import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRE,
    }
  );
  return token;
};

userSchema.methods.isPasswordMatch = function (password) {
  return this.password === password;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
