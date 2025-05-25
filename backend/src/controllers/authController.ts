import express, { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  registerToken,
  deleteToken,
  isRefreshTokenRegistered,
  deleteTokenById,
} from '../models/tokenModel.ts';
import { findUserByEmail } from '../models/userModel.ts';

// An implimentation of UserPayload is encoded in the jwt when logged in.
interface UserPayload {
  id?: number;
  role?: 'admin' | 'user' | 'banned';
}

export async function postLoginUser(req: Request, res: Response) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword) {
    res.status(400).json({
      error:
        'Failed to provide an email or password or both in the request body.',
    });
    return;
  }

  const authedUser = await findUserByEmail(userEmail);
  if (!authedUser) {
    res.status(404).json({ error: 'User not found.' });
  }

  // Delete any existing refresh tokens registered to given user.
  await deleteTokenById(authedUser.id);

  const isValid = await bcrypt.compare(userPassword, authedUser.password);
  if (isValid) {
    const userPayload: UserPayload = {
      id: authedUser.id,
      role: authedUser.role,
    };
    const accessToken = await jwt.sign(
      userPayload,
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '30m' }
    );
    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    const token = await registerToken(refreshToken, authedUser.id);
    console.log(`Registered refresh token: ${token}`);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } else {
    res.status(401).json({ error: 'Invalid login credentials.' });
  }
}

export async function postRefreshToken(req: Request, res: Response) {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    res.status(401).json({ error: 'No token provided.' });
    return;
  }

  if (await isRefreshTokenRegistered(refreshToken)) {
    res.status(401).json({ error: 'Token not in database.' });
    return;
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        res.status(403).json({ error: err });
        return;
      }
      const userPayload: UserPayload = {
        id: user.id,
        role: user.role,
      };
      const accessToken = jwt.sign(
        userPayload,
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '30m' }
      );
      res.status(200).json(accessToken);
    }
  );
}

export async function deleteLogoutUser(req: Request, res: Response) {
  deleteToken(req.body.token);
  res.status(204).json(req.body.token);
}
