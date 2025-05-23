import express, { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import {
  findAllUsers,
  findUserById,
  addUser,
  findUserByEmail,
} from '../models/userModel.ts';

// An implimentation of UserPayload is encoded in the jwt when logged in.
interface UserPayload {
  id?: number;
  role?: 'admin' | 'user' | 'banned';
}

export async function getUserById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (!id) {
    res.status(400).json({ error: 'Id is required' });
    return;
  }

  const user = await findUserById(id);
  if (!user) {
    res.status(500).json({ error: 'User not found!' });
    return;
  }
  res.status(200).json(user);
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await findAllUsers();
  res.status(200).json(users);
}

export async function postNewUser(req: Request, res: Response) {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    res.status(400).json({
      error:
        'Must provide a first name, last name, email, password, and phone number.',
    });
    return;
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.status(500).json({ error: 'Failed to encrypt password.' });
      return;
    }
    const newUser = await addUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      hash
    );
    res.status(201).json(newUser);
    return;
  });
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

  const isValid = await bcrypt.compare(authedUser.password, userPassword);
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
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  }
}
