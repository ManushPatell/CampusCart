import sql from './db.ts';

interface User {
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
    const user = await sql`
    SELECT * 
    FROM users
    WHERE id=${id}
    `;
    if (user.length > 1) {
        throw new Error('Multiple users with same id. Returning first match!');
    } else {
        return user[0];
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
        const newUser = await sql`
        INSERT INTO users (first_name, last_name, email, phone_number, password)
        VALUES (${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${password})
        RETURNING (id, first_name, lastName, email);
        `;
        return newUser;
    } catch (e) {
        return e;
    }
};
