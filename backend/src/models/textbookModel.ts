import sql from "./db.ts";

interface Textbook {
  id: number;
  book_title: string;
  author: string;
  edition: string;
  condition: string;
  seller: number;
  date_posted: string;
  photos: string[];
  year: number;
  faculty: string;
  price: number;
  course_code: string;
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
