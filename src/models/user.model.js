import mongoose, { Schema } from "mongoose";
import { SignJWT } from "jose";

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
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
      url: String,
      publicId: String,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1, role: 1 }, { unique: true });

userSchema.methods.generateAuthToken = async function () {
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
  const token = await new SignJWT({ _id: this._id.toString(), role: this.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.TOKEN_EXPIRE || "15d")
    .sign(secret);

  return token;
};

userSchema.methods.isPasswordMatch = function (password) {
  return this.password === password;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
