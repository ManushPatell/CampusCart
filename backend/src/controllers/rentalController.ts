import express, { type Request, type Response } from 'express';
import { findAllRentals, findRental } from '../models/rentalModel.ts';

export const getRentalById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const house = await findRental(id);
    if (!house) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllRentals = async (req: Request, res: Response) => {

    try {
        const rentals = await findAllRentals();
        res.status(200).json(rentals);
    } catch (error) {
        // 500 indicates a server error.
        res.status(500).json({error: 'Failed to retrieve rentals'});
    }
};
