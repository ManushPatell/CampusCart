import sql from "./db.ts";
import { User } from "./userModel.ts";

type ListingType = "Selling" | "Wanted";

export interface Miscellaneous {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  date_posted: string;
  // photos: string[];
  listing_type: ListingType;
}

export const findMiscById = async (
  id: number,
): Promise<Miscellaneous | null> => {
  const result = await sql<Miscellaneous[]>`
        SELECT * FROM misc WHERE id = ${id}
    `;
  return result[0] ?? null;
};

export const findAllMisc = async (): Promise<Miscellaneous[]> => {
  const result = await sql<Miscellaneous[]>`SELECT * FROM misc`;
  return result;
};

export const findMiscFromUser = async (id: Miscellaneous["id"]) => {
  const result = await sql<
    Miscellaneous[]
  >`SELECT * FROM misc WHERE seller = ${id}`;
  return result;
};

export const addMisc = async (
  misc: Omit<Miscellaneous, "id" | "date_posted">,
) => {
  const result =
    await sql`INSERT INTO misc (title, description, price, seller, listing_type) VALUES (${misc.title}, ${misc.description}, ${misc.price}, ${misc.seller}, ${misc.listing_type})`;
  return result;
};

export async function removeMisc(id: Miscellaneous["id"], user_id: User["id"]) {
  const deleted = await sql<
    Pick<Miscellaneous, "id" | "title">[]
  >`DELETE FROM misc WHERE id = ${id} AND seller = ${user_id} RETURNING *`;
  return deleted;
}
