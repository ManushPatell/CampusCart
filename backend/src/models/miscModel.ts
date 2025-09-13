import sql from "./db.ts";
import { User } from "./userModel.ts";

type ListingType = "Selling" | "Wanted";

export type MiscSeller =
  | string
  | number
  | { id: string | number | null; name: string | null; email: string | null }
  | null;

export interface Miscellaneous {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: MiscSeller;
  date_posted: string;
  photos: string[];
  listing_type: ListingType;
}

export const findMiscById = async (id: string) => {
  const rows = await sql<any[]>`
    SELECT
      m.id,
      m.title,
      m.description,
      m.price,
      m.seller          AS seller_id,
      m.date_posted,
      m.photos,
      m.listing_type,
      jsonb_build_object(
        'id', u.id,
        'name', concat_ws(' ', u.first_name, u.last_name),
        'email', u.email
      ) AS seller
    FROM misc m
    LEFT JOIN users u ON u.id = m.seller
    WHERE m.id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
};

export const findAllMisc = async () => {
  const rows = await sql<any[]>`
    SELECT
      m.id,
      m.title,
      m.description,
      m.price,
      m.seller          AS seller_id,
      m.date_posted,
      m.photos,
      m.listing_type,
      jsonb_build_object(
        'id', u.id,
        'name', concat_ws(' ', u.first_name, u.last_name),
        'email', u.email
      ) AS seller
    FROM misc m
    LEFT JOIN users u ON u.id = m.seller
    ORDER BY m.date_posted DESC NULLS LAST, m.id DESC
  `;
  return rows;
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
    await sql`INSERT INTO misc (title, description, price, seller, listing_type, photos) VALUES (${misc.title}, ${misc.description}, ${misc.price}, ${misc.seller}, ${misc.listing_type}, ${misc.photos})`;
  return result;
};

export const editMisc = async (misc: Omit<Miscellaneous, "date_posted">) => {
  const result =
    await sql`UPDATE misc SET (title, description, price, listing_type) = (${misc.title}, ${misc.description}, ${misc.price}, ${misc.listing_type}) WHERE id = ${misc.id} AND seller = ${misc.seller}`;
  return result;
};

export async function removeMisc(id: Miscellaneous["id"], user_id: User["id"]) {
  const deleted = await sql<
    Pick<Miscellaneous, "id" | "title">[]
  >`DELETE FROM misc WHERE id = ${id} AND seller = ${user_id} RETURNING *`;
  return deleted;
}
