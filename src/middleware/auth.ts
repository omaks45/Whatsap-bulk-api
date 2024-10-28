import jwt from 'jsonwebtoken';
import User from '../models/users.model';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token or invalid format provided' });
    return;
  }
  
  const token = authHeader.split(' ')[1]; // Extract the actual token
  
  try {
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'JWT secret is not defined' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Invalid token: user not found' });
      return;
    }


    // Attach the user to the request object
    req.user = user;
    
    // Continue to the next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
    return;
  }
};
