import { Rental } from "../types/types.ts";
import sql from "./db.ts";

export async function findAllRentals(): Promise<Rental[]> {
  const result = await sql<Rental[]>`SELECT * FROM rentals`;
  return result;
}

export const findRentalById = async (id: string): Promise<Rental | null> => {
  const result = await sql<Rental[]>`SELECT * FROM rentals WHERE id = ${id}`;
  return result[0] ?? null;
};
