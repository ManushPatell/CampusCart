import sql from "./db.ts";
import { User } from "./userModel.ts";

interface Textbook {
  id: string;
  book_title: string;
  author: string;
  edition: string;
  condition: string;
  seller: string;
  date_posted: Date;
  year: number;
  faculty: string;
  price: number;
}

export async function findAllTextbooks(): Promise<Textbook[]> {
  const result = await sql<Textbook[]>`Select * FROM textbooks`;
  return result;
}

export async function findTextbook(id: number): Promise<Textbook | null> {
  const result = await sql<Textbook[]>`
    SELECT * FROM textbooks WHERE id = ${id}
  `;

  return result[0] ?? null;
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
  year: string,
  faculty: string,
  price: number,
  condition: string,
  id: string,
) {
  const result = await sql`
      INSERT INTO textbooks (book_title, seller, author, edition, year, faculty, price, condition)
      VALUES (${book_title}, ${id}, ${author}, ${edition}, ${year}, ${faculty}, ${price}, ${condition}) 
      RETURNING book_title, author;`;
  return result[0];
}

export async function removeTextbook(id: Textbook["id"], user_id: User["id"]) {
  const deleted = await sql<
    Pick<Textbook, "id" | "book_title">[]
  >`DELETE FROM textbooks WHERE id = ${id} AND seller = ${user_id} RETURNING *`;
  return deleted[0];
}
