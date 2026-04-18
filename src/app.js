import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

// Fallbacks for testing just in case the .env file is ignored by Jest
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI = "mongodb://127.0.0.1:27017/taskmanager_test";
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "supersecret_test_key_123";
}

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;