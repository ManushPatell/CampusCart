import sql from "./db.ts";

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

export const findMiscFromUser = async (id: number) => {
  const result = await sql<
    Miscellaneous[]
  >`SELECT * FROM misc WHERE id = ${id}`;
  return result;
};
