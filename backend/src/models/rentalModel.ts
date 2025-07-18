import sql from "./db.ts";

export interface Rental {
  id: number;
  seller: string;
  address: string;
  post_date: string;
  date_available: string;
  description: string;
  house_type: string;
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

export type RentalListing = {
  id: string;
  title: string;
  price: string;
  location: string;
  image?: string;
  description: string;
  details: {
    available: string;
    lease: string;
  };
  amenities: string[];
  seller: {
    name: string;
    contact: string;
  };
};

export interface Rental {
  id: number;
  seller: string;
  address: string;
  post_date: string;
  date_available: string;
  description: string;
  house_type: string;
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

export interface HouseView {
  id: number;
  title: string;
  price: string;
  location: string;
  image?: string;
  description: string;
  details: {
    available: string;
    lease: string;
  };
  amenities: string[];
  seller: {
    name: string;
    contact: string;
  };
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
