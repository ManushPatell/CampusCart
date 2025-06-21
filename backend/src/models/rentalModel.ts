import sql from './db';


//Function that retrieves all rentals from the database
export async function getAllRentalsModel(){
    const result = await sql`SELECT * FROM rentals`;
    return result;
}

// rentalModel.ts
export const getRentalById = async (id: string) => {
  const result = await sql`SELECT * FROM rentals WHERE id = ${id}`;
  return result[0]; // return the house (or undefined)
};
