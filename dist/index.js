import express from 'express';
import dotenv from 'dotenv';
import connectToDabase from './utils/db.js';
import messageRoutes from './routes/message.routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// Database connection
connectToDabase();
// Middleware
app.use(express.json());
app.use('/api/messages', messageRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
