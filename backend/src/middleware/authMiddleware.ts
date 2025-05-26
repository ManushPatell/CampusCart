import { type UserPayload } from '../types/user.ts';
import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];
  const tokenFromCookie = req.cookies && req.cookies.token;

  const token = tokenFromCookie || tokenFromHeader;

  if (token == undefined) {
    res.status(401).json({ error: 'No token provided!' });
    return;
  }

  if (process.env.ACCESS_TOKEN_SECRET == undefined) {
    console.error('No ACCESS_TOKEN_SECRET environment variables');
    res.status(500).json({ error: 'Server had a problem' });
    return;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ error: err });
        return;
      }

      req.user = decoded as UserPayload;
      next();
    }
  );
};
