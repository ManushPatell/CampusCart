import express, { type Request, type Response } from 'express';
import { getAllRentalsModel } from '../models/rentalModel';
import { getRentalById } from '../models/rentalModel';

export const getRentalByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const house = await getRentalById(id);
    if (!house) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllRentals = async (req: Request, res: Response) => {

    try {
        // HTTP status code 200 indicates a successful request
        const rentals = await getAllRentalsModel();
      
        res.status(200).json(rentals);
    } catch (error) {
        // HTTP status code 500 indicates a server error
        res.status(500).json({error: 'Failed to retrieve rentals'});
    }
};
