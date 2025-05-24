import express, { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  findAllUsers,
  findUserById,
  addUser,
  findUserByEmail,
} from '../models/userModel.ts';


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
