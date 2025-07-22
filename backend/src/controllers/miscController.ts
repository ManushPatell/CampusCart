import { type Request, type Response } from "express";
import { findMiscById, findAllMisc } from "../models/miscModel";

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
