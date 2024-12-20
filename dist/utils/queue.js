var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/utils/queue.ts
import Queue from 'bull';
import Message from '../models/message.model.js';
import { sendMessageToWhatsAppAPI } from '../services/whatsappService.js';
const messageQueue = new Queue('message-queue', {
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1', // Default to local Redis during development
        port: Number(process.env.REDIS_PORT) || 6379, // Default to local Redis port
        password: process.env.REDIS_PASSWORD || undefined, // Add password if provided
        tls: process.env.REDIS_TLS === 'true' ? {} : undefined, // If using Redis over TLS/SSL
    },
});
messageQueue.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = job.data;
    const message = yield Message.findById(messageId);
    if (!message) {
        throw new Error('Message not found');
    }
    const response = yield sendMessageToWhatsAppAPI(message);
    message.status = response.success ? 'sent' : 'failed';
    yield message.save();
}));
export default messageQueue;
