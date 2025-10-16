import sql from "./db";
import { RentalListing } from "./rentalModel";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "user" | "admin" | "banned";
}

export const findAllUsers = async (): Promise<User[]> => {
  const users = await sql<User[]>`
    SELECT * 
    FROM users
   `;
  return users;
};

export const findUserById = async (
  id: string,
): Promise<Omit<User, "password">> => {
  const user = await sql<Omit<User, "password">[]>`
        SELECT id, first_name as "firstName", last_name as "lastName", email, phone_number as "phoneNumber", role as "role"
        FROM users
        WHERE id=${id}
        `;
  return user[0];
};

export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: "admin" | "user" | "banned" = "user",
): Promise<
  Pick<User, "id" | "email" | "firstName" | "lastName"> | undefined
> => {
  try {
    const newUser = await sql<
      Pick<User, "id" | "email" | "firstName" | "lastName">[]
    >`
        INSERT INTO users (first_name, last_name, email, phone_number, password, role)
        VALUES (${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${password}, ${role})
        RETURNING id, first_name as "firstName", last_name as "lastName", email;
        `;

    return newUser[0];
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const findUserByEmail = async (
  email: string,
): Promise<Pick<User, "id" | "password" | "email" | "role"> | undefined> => {
  const user = await sql<Pick<User, "id" | "password" | "email" | "role">[]>`
        SELECT id, password, email, role 
        FROM users 
        WHERE email = ${email}`;
  return user[0];
};

export const findUserRentals = async (id: number) => {
  const rentals = await sql<RentalListing[]>`
    SELECT * 
    FROM rentals 
    WHERE id = ${id}`;
  return rentals;
};

export const updateUserPassword = async (email: string, password: string) => {
  const newUser = await sql<
    User[]
  >`UPDATE users SET password = ${password} WHERE email = ${email} RETURNING *`;
  return newUser[0];
};
