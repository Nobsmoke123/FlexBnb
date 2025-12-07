import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME!;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env");
}

if (!DATABASE_NAME) {
  throw new Error("❌ Please define DATABASE_NAME in .env");
}

let cached = (global as any).mongoCache;

if (!cached) {
  cached = (global as any).mongoCache = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  try {
    if (cached.conn) {
      console.info("Database is already connected.");
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: DATABASE_NAME,
      });
    }

    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to database", {
      cause: JSON.stringify(error),
    });
  }
};

export default connectDB;
