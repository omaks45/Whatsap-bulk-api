// src/controllers/messageController.ts
import Message from '../models/message.model';
import messageQueue from '../utils/queue';

import { Request, Response } from 'express';

export const sendBulkMessages = async (req: Request, res: Response) => {
  const { userId, messageContent, recipients, scheduledFor } = req.body;

  const message = new Message({
    userId,
    messageContent,
    recipients,
    scheduledFor,
  });

  await message.save();

  // Add message to queue with scheduling
  messageQueue.add(
    { messageId: message._id },
    { delay: new Date(scheduledFor).getTime() - Date.now() } // Delay based on scheduled time
  );

  res.status(201).json({ success: true, message });
};
