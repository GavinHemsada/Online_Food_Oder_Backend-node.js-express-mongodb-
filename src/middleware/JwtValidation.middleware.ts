import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser, User } from '@/models/User';

export interface AuthedRequest extends Request { user?: IUser; }

export const protectJWT = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId).select('-password'); // remove password
    if (!user) return res.status(401).json({ msg: 'User not found' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
