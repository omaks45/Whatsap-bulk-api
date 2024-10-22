import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    authToken: { type: String },
});
export default mongoose.model('User', userSchema);
