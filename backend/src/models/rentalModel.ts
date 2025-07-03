import sql from './db.ts';

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

///Retrieves all rentals from the database
export async function findAllRentals(): Promise<Rental[]> {
    const result = await sql<Rental[]>
    `SELECT * FROM house`;
    return result;
}

export const findRental = async (id: string): Promise<Rental | null>  => {
  
  const result = await sql<Rental[]>`SELECT * FROM house WHERE id = ${id}`;
  return result[0] ?? null; 
};
