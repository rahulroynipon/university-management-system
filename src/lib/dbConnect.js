import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI || !DB_NAME) {
  throw new Error("Please define MONGODB_URI & DB_NAME in your .env file");
}

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    console.log("Already connected to Database");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
      useCreateIndex: true,
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("Connected to MongoDB");
    } else {
      console.log("Database connection not ready");
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}
