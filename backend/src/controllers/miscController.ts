import { type Request, type Response } from "express";
import {
  findMiscById,
  findAllMisc,
  addMisc,
  removeMisc,
} from "../models/miscModel";

export const getMiscById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const misc = await findMiscById(id);
    if (!misc) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(200).json(misc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllMisc = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const miscList = await findAllMisc();
    res.status(200).json(miscList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const postMisc = async (req: Request, res: Response) => {
  const { title, description, price, listing_type } = req.body;
  const miscPosting = {
    title,
    description,
    price,
    seller: req.user!.id!, // we must be signed in
    listing_type,
  };

  try {
    const result = addMisc(miscPosting);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteMisc = async (req: Request, res: Response) => {
  const { id } = req.user!; // Protected route
  const { id: miscId } = req.params;

  try {
    const deleted = await removeMisc(miscId, id);

    if (deleted.length === 0) {
      res.status(401).json({ error: "Invalid delete request" });
    }
    if (deleted.length === 1) {
      res.status(204).json();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete misc" });
  }
};
