import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import {
  findAllUsers,
  findUserById,
  addUser,
  findUserByEmail,
} from "../models/userModel.ts";

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.user?.id;
  if (!id) {
    res.status(400).json({ error: "Id is required" });
    return;
  }

  let user;
  try {
    user = await findUserById(id);
  } catch (err) {
    next(err);
    return;
  }

  if (!user) {
    res.status(500).json({ error: "User not found!" });
    return;
  }
  res.status(200).json(user);
}

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let users;
  try {
    users = await findAllUsers();
  } catch (err) {
    next(err);
    return;
  }

  res.status(200).json(users);
}

export async function getUserRentals(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Failed to provide an id." });
    return;
  }
  return;
}

export async function getUserTextbooks(req: Request, res: Response) {
  return;
}

export async function postNewUser(req: Request, res: Response) {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    res.status(400).json({
      error:
        "Must provide a first name, last name, email, password, and phone number.",
    });
    return;
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.status(500).json({ error: "Failed to encrypt password." });
      return;
    }

    const usersWithSameEmail = await findUserByEmail(email);
    if (usersWithSameEmail) {
      res.status(409).json({ error: "That email has been taken." });
      return;
    }

    const newUser = await addUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      hash,
    );
    if (!newUser) {
      res.status(409).json({ error: "That email has been taken." });
      return;
    }
    res.status(201).json(newUser);
  });
}
