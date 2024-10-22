// src/routes/messageRoutes.ts
import express from 'express';


import { sendBulkMessages } from '../controllers/message.controller';
import { checkAuth } from '../middleware/auth';


const router = express.Router();

// Route to send bulk messages
router.post('/send', checkAuth, sendBulkMessages);

export default router;
