import express, { type Request, type Response } from "express";
import {
  findAllRentals,
  findRentalById,
  Rental,
  RentalListing,
} from "../models/rentalModel";

//Transformer function

function transformRentalToHouseView(rental: Rental): RentalListing {
  return {
    id: rental.id,
    title: rental.title,
    price: rental.cost.toString(),
    address: rental.address,
    image: rental.image,
    description: rental.description,
    date_posted: rental.date_posted,
    house_type: rental.house_type,
    num_beds: rental.num_beds,
    sublet: rental.is_sublet,
    utilities_included: rental.is_utilities_included,

    details: {
      available: rental.date_available,
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
    },
  };
}

export const getRentalById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const house = await findRentalById(id);
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
