// src/services/whatsappService.ts
import axios from 'axios';

export const sendMessageToWhatsAppAPI = async (message: any) => {
  try {
    if (!process.env.WHATSAPP_API_SID) {
      throw new Error('WHATSAPP_API_SID is not defined');
    }
    const response = await axios.post(process.env.WHATSAPP_API_SID, {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      },
      data: {
        to: message.recipients,
        body: message.messageContent,
      },
    });

    return { success: response.status === 200 };
  } catch (error: any) {
    console.error('Error sending message to WhatsApp:', error.message);
    return { success: false };
  }
};
