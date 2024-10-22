var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, password } = req.body;
    try {
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = new User({ name, phoneNumber, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    try {
        const user = yield User.findOne({ phoneNumber });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const match = yield bcrypt.compare(password, user.password);
        if (!match) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'supersecretkey');
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
