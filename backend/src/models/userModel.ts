import sql from './db.ts';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: 'user' | 'admin' | 'banned';
}

// CAUTION, this interface contains the user password
interface SecureUser {
  id: number;
  password: string;
  email: string;
  role: 'user' | 'admin' | 'banned';
}

export const findAllUsers = async (): Promise<User[]> => {
  const users = await sql<User[]>`
    SELECT * 
    FROM users
   `;
  return users;
};

interface FoundUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}

export const findUserById = async (id: number): Promise<FoundUser> => {
  const user = await sql<FoundUser[]>`
        SELECT id, first_name as "firstName", last_name as "lastName", email, phone_number as "phoneNumber" 
        FROM users
        WHERE id=${id}
        `;
  return user[0];
};

export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number,
  password: string,
  role: 'admin' | 'user' | 'banned' = 'user'
): Promise<{
  id: number;
  email: string;
  firstName: string;
  lastName: string;
} | undefined> => {
  try {
const newUser = await sql<
    {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    }[]
  >`
        INSERT INTO users (first_name, last_name, email, phone_number, password, role)
        VALUES (${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${password}, ${role})
        RETURNING id, first_name as "firstName", last_name as "lastName", email;
        `;

  return newUser[0];
  } catch (err: any) {
    console.error(err)
    return undefined
  }
  
};

export const findUserByEmail = async (
  email: string
): Promise<SecureUser | undefined> => {
    const user = await sql<SecureUser[]>`
        SELECT id, password, email, role 
        FROM users 
        WHERE email = ${email}`;
    return user[0];
};
