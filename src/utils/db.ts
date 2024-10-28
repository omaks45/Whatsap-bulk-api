import dotenv from "dotenv";
import mongoose from "mongoose";
import { createClient } from 'redis';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || '', {});
        console.log("Database connected successfully");
    } catch (error: any) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

export default connectToDatabase;

// Redis configuration for development vs production
let redisHost = process.env.REDIS_HOST;
let redisPort = parseInt(process.env.REDIS_PORT || '6379');
let redisPassword = process.env.REDIS_PASSWORD || '';

if (process.env.NODE_ENV === 'development') {
    redisHost = '127.0.0.1';  // Localhost for development
    redisPort = 6379;         // Default Redis port
    redisPassword = '';       // No password for local Redis
}

// Initialize Redis client
export const redisClient = createClient({
    password: redisPassword || undefined, // Password only if provided
    socket: {
        host: redisHost,
        port: redisPort
    }
});
