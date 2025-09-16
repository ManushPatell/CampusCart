import sql from "./db";
import { User } from "./userModel";

export interface Textbook {
  id: string | number; // use string if your id is uuid; number if integer
  book_title: string;
  author: string | null;
  edition: string | null;
  condition: string | null;
  seller_id?: string | null;
  seller: { id: string | null; name: string | null; email: string | null } | null;
  date_posted: string | null;
  year: number | null;
  faculty: string | null;
  price: number;
  photos: string[] | null;
}


export async function findAllTextbooks(): Promise<Textbook[]> {
  const rows = await sql<Textbook[]>`
    SELECT
      t.id,
      t.book_title,
      t.author,
      t.edition,
      t.condition,
      t.date_posted,
      t.year,
      t.faculty,
      t.price,
      t.photos,
      t.seller AS seller_id,
      jsonb_build_object(
        'id', u.id,
        'name', concat_ws(' ', u.first_name, u.last_name),
        'email', u.email
      ) AS seller
    FROM textbooks t
    LEFT JOIN users u ON u.id = t.seller
    ORDER BY t.date_posted DESC NULLS LAST, t.id DESC
  `;
  return rows;
}


export async function findTextbook(id: string): Promise<Textbook | null> {
  const rows = await sql<Textbook[]>`
    SELECT
      t.id,
      t.book_title,
      t.author,
      t.edition,
      t.condition,
      t.date_posted,
      t.year,
      t.faculty,
      t.price,
      t.photos,
      t.seller AS seller_id,
      jsonb_build_object(
        'id', u.id,
        'name', concat_ws(' ', u.first_name, u.last_name),
        'email', u.email
      ) AS seller
    FROM textbooks t
    LEFT JOIN users u ON u.id = t.seller
    WHERE t.id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function findTextbooksFromUser(id: string) {
  const textbooks = await sql<
    Textbook[]
  >`SELECT * FROM textbooks WHERE seller = ${id}`;
  return textbooks;
}

export async function addTextbook(
  book_title: string,
  author: string,
  edition: string,
  year: number,
  faculty: string,
  price: number,
  condition: string,
  id: string,
  photos: string[],
) {
  const photosArray =
    photos && photos.length > 0
      ? sql`ARRAY[${sql.array(photos)}]`
      : sql`ARRAY[]::text[]`;

  const result = await sql`
      INSERT INTO textbooks (book_title, seller, author, edition, year, faculty, price, condition, photos)
      VALUES (${book_title}, ${id}, ${author}, ${edition}, ${year}, ${faculty}, ${price}, ${condition}, ${photosArray}) 
      RETURNING *;`;
  return result[0];
}

export async function editTextbook(
  book_title: string,
  author: string,
  edition: string,
  year: string,
  faculty: string,
  price: number,
  condition: string,
  textbookId: string,
  sellerId: string,
) {
  const result = await sql`
      UPDATE textbooks SET (book_title, author, edition, year, faculty, price, condition) = (${book_title}, ${author}, ${edition}, ${year}, ${faculty}, ${price}, ${condition}) WHERE id = ${textbookId} AND seller = ${sellerId} RETURNING *;`;
  return result[0];
}

export async function removeTextbook(id: Textbook["id"], user_id: User["id"]) {
  const deleted = await sql<
    Pick<Textbook, "id" | "book_title">[]
  >`DELETE FROM textbooks WHERE id = ${id} AND seller = ${user_id} RETURNING *`;
  return deleted;
}
