import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  try {
    // if database is already connected, don't connect again
    if (!connected) {
      console.log("The database is already connected.");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
