// src/utils/queue.ts
import Queue from 'bull';
import Message from '../models/message.model';
import { sendMessageToWhatsAppAPI } from '../services/whatsappService';

const messageQueue = new Queue('message-queue', {
  redis: { host: '127.0.0.1', port: 6379 },
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
