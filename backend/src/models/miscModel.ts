import sql from "./db.ts";
import { User } from "./userModel.ts";

export interface Miscellaneous {
  id: number;
  title: string;
  description: string;
  price: number;
  seller: number;
  date_posted: string;
  photos: string[];
  condition: string;
  category: string;
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
  >`SELECT * FROM misc WHERE id = ${id}`;
  return result;
};

export async function removeMisc(id: Miscellaneous["id"], user_id: User["id"]) {
  const deleted = await sql<
    Pick<Miscellaneous, "id" | "title">[]
  >`DELETE FROM misc WHERE id = ${id} AND seller = ${user_id} RETURNING *`;
  return deleted;
}
