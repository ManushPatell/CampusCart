import sql from './db.ts';

interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
}

export const findAllUsers = async (): Promise<User[]> => {
    const users = await sql`
    SELECT * 
    FROM users
   `;
    return users;
};

export const findUserById = async (id: number): Promise<User> => {
    try {
        const user = await sql`
        SELECT id, first_name, last_name, email, phone_number 
        FROM users
        WHERE id=${id}
        `;
        if (user.length > 1) {
            throw new Error('Multiple users with same id. Returning first match!');
        } else {
            return user[0];
        }
    } catch (err) {
        throw new Error(`Error finding user by id: ${err}`);
    }
};

export const addUser = async (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    password: string
) => {
    try {
        const newUser: any = await sql`
        INSERT INTO users (first_name, last_name, email, phone_number, password)
        VALUES (${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${password})
        RETURNING id, first_name, last_name, email;
        `;
        return newUser[0];
    } catch (err: any) {
        if (err.code === '23505') {
            throw new Error('That email has been taken!');
        } else if (err instanceof Error) {
            throw new Error(`Update failed: ${err.message}`);
        } else {
            throw new Error(String(err));
        }
    }
};
