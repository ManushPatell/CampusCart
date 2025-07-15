import sql from "./db.ts";

export interface Miscallenous {
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

export const findMiscbyId = async (id: number): Promise<Miscallenous | null> => {
    const result = await sql<Miscallenous[]>`
        SELECT * FROM misc WHERE id = ${id}
    `;
    return result[0] ?? null;
}

export const findAllMisc = async (): Promise<Miscallenous[]> => {
    const result = await sql<Miscallenous[]>
        `SELECT * FROM misc`;
    return result;
}
