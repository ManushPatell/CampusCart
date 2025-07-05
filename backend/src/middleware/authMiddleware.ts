import { type UserPayload } from '../types/user.ts';
import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken == undefined) {
    res.status(401).json({ error: 'No token provided!' });
    return;
  }

  if (process.env.ACCESS_TOKEN_SECRET == undefined) {
    console.error('No ACCESS_TOKEN_SECRET environment variables');
    res.status(500).json({ error: 'Server had a problem' });
    return;
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ error: err });
        return;
      }

      const userPayload = decoded as UserPayload;
      if (userPayload.role === "banned") {
        res.status(403).json({error: "You have been banned."})
        return;
      }
      req.user = userPayload;
      next();
    }
  );
};
