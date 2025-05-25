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

interface foundUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
}

export const findUserById = async (id: number): Promise<foundUser> => {
  const user = await sql<foundUser[]>`
        SELECT id, first_name, last_name, email, phone_number 
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
}> => {
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
        ON CONFLICT (email) DO NOTHING
        RETURNING id, first_name, last_name, email;
        `;

  return newUser[0];
};

export const findUserByEmail = async (email: string): Promise<SecureUser> => {
  const user = await sql<SecureUser[]>`
        SELECT * 
        FROM users 
        WHERE email = ${email}`;
  if (user.length > 1) {
    throw new Error('Multiple users with same email. Returning first match!');
  }
  return user[0];
};
