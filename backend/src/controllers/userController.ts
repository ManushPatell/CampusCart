import express, { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { findAllUsers, findUserById, addUser } from '../models/userModel.ts';

export async function getUserById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'Id is required' });
    }

    const user = await findUserById(id);
    if (!user) {
        return res.status(500).json({ error: 'User not found!' });
    }
    res.status(200).json(user);
}

export async function getAllUsers(req: Request, res: Response) {
    const users = await findAllUsers();
    res.status(200).json(users);
}

export async function postNewUser(req: Request, res: Response) {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
        return res
            .status(400)
            .json({ error: 'Must provide a first name, last name, email and phone number.' });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to encrypt password.' });
        }
        const newUser = await addUser(firstName, lastName, email, phoneNumber, hash);
    });
}
