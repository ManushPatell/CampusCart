import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id?: string;
  role?: 'user' | 'admin' | 'banned';
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == undefined) {
    res.status(401).json({ error: 'No token provided!' });
    return;
  }

  if (process.env.ACCESS_TOKEN_SECRET == undefined) {
    console.error('No ACCESS_TOKEN_SECRET environment variables');
    throw new Error('Server had a problem');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: err });
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
