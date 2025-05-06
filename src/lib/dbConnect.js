import User from "@/models/user.model";
import mongoose from "mongoose";
import { initializeAdmin } from "./initialize";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI || !DB_NAME) {
  throw new Error("Please define MONGODB_URI & DB_NAME in your .env file");
}

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    console.log("Already connected to Database");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("Connected to MongoDB");
      const adminExist = await User.findOne({ email: process.env.ADMIN_EMAIL });
      if (!adminExist) {
        await User.create(initializeAdmin());
        console.log("Admin created");
      }
    } else {
      console.log("Database connection not ready");
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}
