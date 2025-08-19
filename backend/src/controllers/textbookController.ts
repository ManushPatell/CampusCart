import { type Request, type Response } from "express";

import {
  addTextbook,
  findAllTextbooks,
  findTextbook,
} from "../models/textbookModel";

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

export async function postTextbook(req: Request, res: Response) {
  const textbook = req.body;
  const { id } = req.user!; // This must be filed since this is a protected route

  if (!textbook?.book_title || !textbook?.price) {
    res.status(400).json({ error: "Failed to provide required parameters." });
    return;
  }
  let photos = req.body.photos; // Ensure photos is an array of strings
  if (typeof photos === "string") {
    // If photos is a single string, convert it to an array
    photos = [photos];
  } else if (!Array.isArray(photos)) {
    photos = [];
  } else {
    photos = photos.filter((p) => typeof p === "string");
  }
  try {
    const result = await addTextbook(
      textbook.book_title,
      textbook.author,
      textbook.edition,
      textbook.year,
      textbook.faculty,
      textbook.price,
      textbook.condition,
      id,
      textbook.photos,
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error while posting new textbook. ", error);
    res.status(500).json({ error: "Error posting new textbook." });
  }
}
