import express, { type Request, type Response } from "express";
import { findAllRentals, findRental, Rental } from "../models/rentalModel.ts";
import { HouseView } from "../types/types.ts";

//Transformer function

function transformRentalToHouseView(rental: Rental): HouseView {
  return {
    id: rental.id,
    title: rental.title,
    price: rental.cost.toString(),
    location: rental.address,
    image: rental.image ?? "",
    description: rental.description,

    details: {
      available: rental.date_available,
      lease: rental.post_date,
    },

    amenities: [
      rental.has_laundry ? "Laundry" : "",
      rental.has_cooking ? "Cooking" : "",
      rental.has_parking ? "Parking" : "",
      rental.no_smoking ? "No Smoking" : "",
      rental.is_shared ? "Shared" : "",
    ].filter(Boolean) as string[],

    seller: {
      name: rental.seller,
      contact: rental.contact,
    },
  };
}
export const getRentalById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const house = await findRental(id);
    if (!house) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const transformedHouse = transformRentalToHouseView(house);

    res.status(200).json(transformedHouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllRentals = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rentals = await findAllRentals();
    const transformedRentals = rentals.map(transformRentalToHouseView);
    res.status(200).json(transformedRentals);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve rentals" });
  }
};
