import express, { type Request, type Response } from "express";

import { findAllTextbooks, findTextbook } from "../models/textbookModel";

export async function getAllTextbooks(req: Request, res: Response) {
  try {
    const textbook = await findAllTextbooks();
    res.status(200).json(textbook);
  } catch (error) {
    console.error("Error fetching textbooks:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching textbooks" });
  }
}

export async function getTextbookById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const textbook = await findTextbook(parseInt(id));
    if (isNaN(Number(id)) || !textbook) {
      res.status(404).json({ error: "Textbook not found" });
      return;
    }
    res.status(200).json(textbook);
  } catch (error) {
    console.error("Error fetching textbook:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the textbook" });
  }
}
