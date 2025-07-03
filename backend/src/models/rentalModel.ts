import sql from './db.ts';

// Retrieves all rentals from the database
export async function findAllRentals() {
  const result = await sql`SELECT * FROM rentals`;
  return result;
}

export async function findRental(id: string)  {
  const result = await sql`SELECT * FROM rentals WHERE id = ${id}`;
  return result[0]; // return the house (or undefined)
};
