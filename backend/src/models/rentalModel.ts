import sql from "./db.ts";
import { User } from "./userModel.ts";

export type RentalListing = {
  id: string;
  title: string;
  price: string;
  address: string;
  image?: string;
  description: string;
  date_posted: string;
  house_type: string;
  num_beds: number;
  utilities_included: boolean;
  sublet: boolean;
  details: {
    available: string;
  };
  amenities: string[];
  seller: {
    name: string;
  };
};

export interface Rental {
  id: string;
  title: string;
  seller: string;
  address: string;
  post_date: string;
  date_available: string;
  description: string;
  house_type: "Apartment" | "House" | "Bedroom" | "Basement";
  cost: number;
  num_beds: number;
  is_cost_per_room: boolean;
  is_utilities_included: boolean;
  is_sublet: boolean;
  has_laundry: boolean;
  has_cooking: boolean;
  has_parking: boolean;
  no_smoking: boolean;
  is_shared: boolean;
}

export async function findAllRentals(): Promise<Rental[]> {
  const result = await sql<Rental[]>`SELECT * FROM rentals`;
  return result;
}

export async function findRentalById(id: string): Promise<Rental | null> {
  const result = await sql<Rental[]>`SELECT * FROM rentals WHERE id = ${id}`;
  return result[0] ?? null;
}

export async function findRentalsFromUser(id: string) {
  const rentals = await sql<
    Rental[]
  >`SELECT * FROM rentals WHERE seller = ${id}`;
  return rentals;
}

export async function addRental(rental: Omit<Rental, "id">) {
  const result =
    await sql`INSERT INTO rentals (title, seller, address, post_date, date_available, description, house_type, cost, num_beds, is_cost_per_room, is_utilities_included, is_sublet, has_laundry, has_cooking, has_parking, no_smoking, is_shared) VALUES (${rental.title}, ${rental.seller}, ${rental.address}, ${rental.post_date}, ${rental.date_available}, ${rental.description}, ${rental.house_type}, ${rental.cost}, ${rental.num_beds}, ${rental.is_cost_per_room}, ${rental.is_utilities_included}, ${rental.is_sublet}, ${rental.has_laundry}, ${rental.has_cooking}, ${rental.has_parking}, ${rental.no_smoking}, ${rental.is_shared});`;

  return result;
}

export async function removeRental(id: Rental["id"], user_id: User["id"]) {
  const deleted = await sql<
    Pick<Rental, "id" | "title">[]
  >`DELETE FROM rentals WHERE id = ${id} AND seller = ${user_id} RETURNING *`;
  return deleted;
}
