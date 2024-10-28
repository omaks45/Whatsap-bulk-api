import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase, { redisClient } from './utils/db'; 
import userRoutes from './routes/users.routes';
import messageRoutes from './routes/message.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Function to start the server when both MongoDB and Redis are connected
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Connect to Redis (Redis client is only connected here)
    await redisClient.connect();
    console.log('Redis connected successfully');

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error: any) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit the process if there is an error
  }
};

// Start the application
startServer();
