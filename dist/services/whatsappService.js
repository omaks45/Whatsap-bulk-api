var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/services/whatsappService.ts
import axios from 'axios';
export const sendMessageToWhatsAppAPI = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.WHATSAPP_API_SID) {
            throw new Error('WHATSAPP_API_SID is not defined');
        }
        const response = yield axios.post(process.env.WHATSAPP_API_SID, {
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
            },
            data: {
                to: message.recipients,
                body: message.messageContent,
            },
        });
        return { success: response.status === 200 };
    }
    catch (error) {
        console.error('Error sending message to WhatsApp:', error.message);
        return { success: false };
    }
});
