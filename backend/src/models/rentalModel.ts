import sql from "./db.ts";

export type RentalListing = {
  id: number;
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
  id: number;
  title: string;
  image: string;
  seller: string;
  address: string;
  date_posted: string;
  date_available: string;
  description: string;
  house_type: string;
  cost: number;
  num_beds: number;
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
