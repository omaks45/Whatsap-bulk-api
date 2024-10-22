import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messageContent: { type: String, required: true },
    recipients: [{ type: String, required: true }],
    status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
    scheduledFor: { type: Date, required: true },
});
export default mongoose.model('Message', messageSchema);
