import { type UserPayload } from "../types/user";
import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import {
  registerToken,
  deleteToken,
  isRefreshTokenRegistered,
  deleteTokenById,
} from "../models/tokenModel";
import { findUserByEmail, findUserById } from "../models/userModel";

const REFRESH_TOKEN_NAME = "refreshToken";
const ACCESS_TOKEN_NAME = "accessToken";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export async function getUserInformation(req: Request, res: Response) {
  const { id } = req.user!; // This route is protected which guarantees req.user exists
  const user = await findUserById(id);

  if (!user) {
    res.status(404).json({ error: "User information not found." });
    return;
  }

  res.status(200).json(user);
}

export async function postLoginUser(req: Request, res: Response) {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if (!userEmail || !userPassword) {
    res.status(400).json({
      error:
        "Failed to provide an email or password or both in the request body.",
    });
    return;
  }

  const authedUser = await findUserByEmail(userEmail);
  if (!authedUser) {
    res.status(404).json({ error: "User not found." });
    return;
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
      { expiresIn: "30m" },
    );
    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET as string,
    );
    const token = await registerToken(refreshToken, authedUser.id);
    console.log(`Registered refresh token: ${token}`);
    res
      .status(200)
      .cookie(ACCESS_TOKEN_NAME, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        expires: new Date(Date.now() + 1800000), // expires in 30 minutes
      })
      .cookie(REFRESH_TOKEN_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/",
        expires: new Date(Date.now() + 604800000), // expires in 7 days
      })
      .json({});

    return;
  } else {
    res.status(401).json({ error: "Invalid login credentials." });
  }
}

export async function getLogoutUser(req: Request, res: Response) {
  res
    .clearCookie(ACCESS_TOKEN_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    })
    .clearCookie(REFRESH_TOKEN_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    })
    .status(200)
    .json("Success");

  return;
}

export async function postForgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ error: "User not found" });

  const token = jwt.sign(
    { email },
    process.env.RESET_PASSWORD_TOKEN_SECRET as string,
    {
      expiresIn: "5m",
    },
  );

  const resetLink = `${process.env.FRONTEND_ORIGIN as string}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `CampusCart Support <${process.env.EMAIL_USER}@gmail.com>`,
    to: email,
    subject: "CampusCart password reset",
    html: `<p>Hello there! To update your password, click <a href="${resetLink}">here</a>. This link expires in 5 minutes.</p>`,
  });

  res.status(200).json({ message: "Password reset email sent" });
}

export async function postRefreshToken(req: Request, res: Response) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) {
    res.status(401).json({ error: "No refresh token provided." });
    return;
  }

  if (await isRefreshTokenRegistered(refreshToken)) {
    res.status(401).json({ error: "Refresh token not in database." });
    return;
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    //@ts-expect-error Not sure why typescript doesn't like this
    (err: unknown, user: UserPayload) => {
      if (err) {
        res.status(403).json({ error: err });
        return;
      }
      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "30m" },
      );
      res.status(200).cookie(ACCESS_TOKEN_NAME, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 30, // 30 minutes
      });
      return;
    },
  );
}

export async function deleteLogoutUser(req: Request, res: Response) {
  deleteToken(req.body.token);
  res.status(204).json(req.body.token);
  return;
}
