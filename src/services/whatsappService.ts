// src/services/whatsappService.ts
import axios from 'axios';

export const sendMessageToWhatsAppAPI = async (message: any) => {
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
    const response = await axios.post(url, data.toString(), {
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
  } catch (error: any) {
    console.error('Error sending message to WhatsApp:', error.message);
    return { success: false, error: error.message };
  }
};
