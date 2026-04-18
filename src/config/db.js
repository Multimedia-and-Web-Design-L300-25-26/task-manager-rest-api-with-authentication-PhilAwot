import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("ACTUAL DB ERROR:", error.message);
    // We removed process.exit(1) so the app doesn't instantly die
    throw error; // This lets Jest catch the error and display it to you
  }
};

export default connectDB;