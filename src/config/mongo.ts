import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const mongoOptions = {
    maxPoolSize: parseInt(
        process.env.MAX_POOL_SIZE || (isProduction ? '50' : '10')
    ),
    serverSelectionTimeoutMS: parseInt(
        process.env.SERVER_SELECTION_TIMEOUT || (isProduction ? '30000' : '5000')
    ),
    socketTimeoutMS: parseInt(
        process.env.SOCKET_TIMEOUT || (isProduction ? '45000' : '10000')
    ),
};

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string, mongoOptions);
         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
mongoose.connection.on("connected", () => {
    console.log("🟢 MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
    console.warn("🟡 MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
    console.log("♻️ MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
    console.error("🔴 MongoDB error:", err);
})


