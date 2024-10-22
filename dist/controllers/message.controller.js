var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/controllers/messageController.ts
import Message from '../models/message.model.js';
import messageQueue from '../utils/queue.js';
export const sendBulkMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, messageContent, recipients, scheduledFor } = req.body;
    const message = new Message({
        userId,
        messageContent,
        recipients,
        scheduledFor,
    });
    yield message.save();
    // Add message to queue with scheduling
    messageQueue.add({ messageId: message._id }, { delay: new Date(scheduledFor).getTime() - Date.now() } // Delay based on scheduled time
    );
    res.status(201).json({ success: true, message });
});
