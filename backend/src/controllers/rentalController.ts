import { type Request, type Response } from "express";
import { findAllRentals, findRentalById } from "../models/rentalModel.ts";

export const getRentalById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const house = await findRentalById(id);
    if (!house) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.status(200).json(house);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllRentals = async (req: Request, res: Response) => {
  try {
    const rentals = await findAllRentals();
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve rentals: ${error}` });
  }
};
