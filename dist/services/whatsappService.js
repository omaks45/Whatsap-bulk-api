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
        // Check for required environment variables
        if (!process.env.WHATSAPP_API_SID || !process.env.WHATSAPP_API_TOKEN) {
            throw new Error('WHATSAPP_API_SID or WHATSAPP_API_TOKEN is not defined');
        }
        // Prepare form data for the Twilio API
        const data = new URLSearchParams();
        data.append('To', `whatsapp:${message.recipients}`); // Recipient's WhatsApp number
        data.append('From', 'whatsapp:+18433145236'); // Your Twilio WhatsApp number
        data.append('Body', message.messageContent); // Message content
        // Construct Twilio API endpoint URL
        const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.WHATSAPP_API_SID}/Messages.json`;
        // Make the API request with axios
        const response = yield axios.post(url, data.toString(), {
            auth: {
                username: process.env.WHATSAPP_API_SID, // Twilio Account SID
                password: process.env.WHATSAPP_API_TOKEN, // Twilio Auth Token
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // Return success if message was sent successfully
        return { success: response.status === 201 }; // HTTP 201 indicates resource created (message sent)
    }
    catch (error) {
        console.error('Error sending message to WhatsApp:', error.message);
        return { success: false, error: error.message };
    }
});
