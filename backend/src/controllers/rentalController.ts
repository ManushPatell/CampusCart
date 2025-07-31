import express, { type Request, type Response } from "express";
import {
  addRental,
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
    description: rental.description,
    date_posted: rental.post_date,
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
  const id = req.params.id;

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
  } catch {
    res.status(500).json({ error: "Failed to retrieve rentals" });
  }
};

export const postRental = async (req: Request, res: Response) => {
  const { id } = req.user!; // This is guaranteed to exist since this route is protected.

  const {
    title,
    address,
    date_available,
    description,
    house_type,
    cost,
    num_beds,
    is_cost_per_room,
    is_utilities_included,
    is_sublet,
    has_laundry,
    has_cooking,
    has_parking,
    no_smoking,
    is_shared,
  } = req.body;

  const postedRental: Omit<Rental, "id"> = {
    title,
    seller: id,
    address,
    date_available,
    post_date: new Date().toDateString(),
    description,
    house_type,
    cost,
    num_beds,
    is_cost_per_room,
    is_utilities_included,
    is_sublet,
    has_laundry,
    has_cooking,
    has_parking,
    no_smoking,
    is_shared,
  };

  try {
    const rental = await addRental(postedRental);

    res.status(200).json({ rental: rental });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert rental" });
  }
};
