
import mongoose from "mongoose";
import app from "./app";
import { connectDB } from "./config/mongo";

const PORT = process.env.PORT || 3000;




// /* -------------------- Server Start -------------------- */
const server = app.listen(PORT, async () => {
   await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

/* -------------------- Graceful Shutdown -------------------- */
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  await mongoose.connection.close();
  server.close(() => {
    console.log("Process terminated");
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down gracefully...");
  await mongoose.connection.close();
  server.close(() => {
    console.log("Process terminated");
  });
});

/* -------------------- Crash Safety -------------------- */
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
