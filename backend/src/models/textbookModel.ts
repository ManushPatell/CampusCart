import sql from './db.ts';

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

export async function FindAllTextbooks(): Promise<Textbook[]>{
    const result = await sql<Textbook[]>
    `Select * FROM textbooks`;
    return result;
}

export const findTextbook = async (id: number): Promise<Textbook | null> => {
  const result = await sql<Textbook[]>`
    SELECT * FROM textbooks WHERE id = ${id}
  `;
  
  return result[0] ?? null;
};
