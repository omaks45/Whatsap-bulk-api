// src/utils/queue.ts
import Queue from 'bull';
import Message from '../models/message.model';
import { sendMessageToWhatsAppAPI } from '../services/whatsappService';

const messageQueue = new Queue('message-queue', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1', // Default to local Redis during development
    port: Number(process.env.REDIS_PORT) || 6379, // Default to local Redis port
    password: process.env.REDIS_PASSWORD || undefined, // Add password if provided
    tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // If using Redis over TLS/SSL
  },
});

messageQueue.process(async (job) => {
  const { messageId } = job.data;
  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found');
  }

  const response = await sendMessageToWhatsAppAPI(message);

  message.status = response.success ? 'sent' : 'failed';
  await message.save();
});

export default messageQueue;
