import sql from "./db.ts";

export interface Textbook {
  id: number;
  book_title: string;
  author: string;
  edition: string;
  condition: string;
  seller: string;
  date_posted: Date;
  year: number;
  faculty: string;
  price: number;
  photos: string[];
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
