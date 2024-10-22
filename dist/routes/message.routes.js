// src/routes/messageRoutes.ts
import express from 'express';
import { sendBulkMessages } from '../controllers/message.controller.js';
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();
// Route to send bulk messages
router.post('/send', checkAuth, sendBulkMessages);
export default router;
