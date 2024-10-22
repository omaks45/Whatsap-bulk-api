var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
export const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: 'JWT secret is not defined' });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = yield User.findById(decoded._id);
        if (!user) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        // Attach the user to the request object
        req.user = user;
        // Continue to the next middleware/route handler
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is invalid' });
        return;
    }
});
