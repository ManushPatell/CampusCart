import express, { Request, Response } from 'express';

export const getRentalById = (req: Request, res: Response) => {
    res.status(200).json({ msg: 'hello' });
};

export const getAllRentals = async (req: Request, res: Response) => {
    res.status(200).json({ msg: 'hello' });
};
