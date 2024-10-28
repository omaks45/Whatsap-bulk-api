var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase, { redisClient } from './utils/db.js';
import userRoutes from './routes/users.routes.js';
import messageRoutes from './routes/message.routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(express.json());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
// Function to start the server when both MongoDB and Redis are connected
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield connectToDatabase();
        // Connect to Redis (Redis client is only connected here)
        yield redisClient.connect();
        console.log('Redis connected successfully');
        // Start the server
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process if there is an error
    }
});
// Start the application
startServer();
