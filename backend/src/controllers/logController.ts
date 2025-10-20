import { type Request, type Response } from "express";
import fs from "fs";
import path from "path";

export async function postLogVisit(req: Request, res: Response) {
  const { path: visitedPath, userAgent, timestamp } = req.body;

  if (!visitedPath || !userAgent || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const logLine = `${timestamp} | ${visitedPath} | ${userAgent}\n`;
  const logFile = "/app/logs/logs.log";
  fs.appendFile(logFile, logLine, (err) => {
    if (err) {
      console.error("Failed to write visit log:", err);
      return res.status(500).json({ error: "Failed to log visit" });
    }
    res.status(200).json({ message: "Visit logged" });
  });
}
