import sql from "./db.ts";
import { User } from "./userModel.ts";

export type RentalListing = {
  id: string;
  title: string;
  price: string;
  address: string;
  photos?: string[];
  description: string;
  date_posted: string;
  house_type: string;
  num_beds: number;
  utilities_included: boolean;
  sublet: boolean;
  details: {
    available: string;
  };
  amenities: string[];
  seller: {
    name: string;
  };
};

export type Rental = {
  id: string;
  title: string;
  seller_id?: string | null;
  seller: { id: string | null; name: string | null; email: string | null } | null;
  address: string;
  post_date: string | null;
  date_available: string | null;
  description: string | null;
  house_type: "Apartment" | "House" | "Bedroom" | "Basement";
  cost: number;
  num_beds: number | null;
  is_cost_per_room: boolean | null;
  is_utilities_included: boolean | null;
  is_sublet: boolean | null;
  has_laundry: boolean | null;
  has_cooking: boolean | null;
  has_parking: boolean | null;
  no_smoking: boolean | null;
  is_shared: boolean | null;
  photos: string[] | null;
};


export async function findAllRentals(): Promise<Rental[]> {
  const rows = await sql<Rental[]>`
    SELECT
      r.id,
      r.title,
      r.address,
      r.post_date,
      r.date_available,
      r.description,
      r.house_type,
      r.cost,
      r.num_beds,
      r.is_cost_per_room,
      r.is_utilities_included,
      r.is_sublet,
      r.has_laundry,
      r.has_cooking,
      r.has_parking,
      r.no_smoking,
      r.is_shared,
      r.photos,
      r.seller AS seller_id,
      jsonb_build_object(
        'id', u.id,
        'name', concat_ws(' ', u.first_name, u.last_name),
        'email', u.email
      ) AS seller
    FROM rentals r
    LEFT JOIN users u ON u.id = r.seller
    ORDER BY r.post_date DESC NULLS LAST, r.id DESC
  `;
  return rows;
}


export async function findRentalById(id: string): Promise<Rental | null> {
  const rows = await sql<Rental[]>`
    SELECT
      r.id,
      r.title,
      r.address,
      r.post_date,
      r.date_available,
      r.description,
      r.house_type,
      r.cost,
      r.num_beds,
      r.is_cost_per_room,
      r.is_utilities_included,
      r.is_sublet,
      r.has_laundry,
      r.has_cooking,
      r.has_parking,
      r.no_smoking,
      r.is_shared,
      r.photos,
      r.seller AS seller_id,
      jsonb_build_object(
        'id', u.id,
        'name', concat_ws(' ', u.first_name, u.last_name),
        'email', u.email
      ) AS seller
    FROM rentals r
    LEFT JOIN users u ON u.id = r.seller
    WHERE r.id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}


export async function findRentalsFromUser(id: string) {
  const rentals = await sql<
    Rental[]
  >`SELECT * FROM rentals WHERE seller = ${id}`;
  return rentals;
}

export async function addRental(rental: Omit<Rental, "id">) {
  const result = await sql`
  INSERT INTO rentals (
    title, seller, address, post_date, date_available, description,
    house_type, cost, num_beds, is_cost_per_room, is_utilities_included,
    is_sublet, has_laundry, has_cooking, has_parking, no_smoking,
    is_shared, photos
  )
  VALUES (${rental.title}, ${rental.seller}, ${rental.address}, ${rental.post_date}, ${rental.date_available}, ${rental.description},
    ${rental.house_type}, ${rental.cost}, ${rental.num_beds},
    ${rental.is_cost_per_room}, ${rental.is_utilities_included},
    ${rental.is_sublet}, ${rental.has_laundry}, ${rental.has_cooking},
    ${rental.has_parking}, ${rental.no_smoking}, ${rental.is_shared},
    ARRAY[${sql.array(rental.photos)}])
    `;

  return result[0];
}

export async function editRental(rental: Omit<Rental, "post_date">) {
  const result =
    await sql`UPDATE rentals SET (title, address, date_available, description, house_type, cost, num_beds, is_cost_per_room, is_utilities_included, is_sublet, has_laundry, has_cooking, has_parking, no_smoking, is_shared) = (${rental.title}, ${rental.address}, ${rental.date_available}, ${rental.description}, ${rental.house_type}, ${rental.cost}, ${rental.num_beds}, ${rental.is_cost_per_room}, ${rental.is_utilities_included}, ${rental.is_sublet}, ${rental.has_laundry}, ${rental.has_cooking}, ${rental.has_parking}, ${rental.no_smoking}, ${rental.is_shared}) WHERE id = ${rental.id} AND seller = ${rental.seller} RETURNING *;`;

  return result[0];
}

export async function removeRental(id: Rental["id"], user_id: User["id"]) {
  const deleted = await sql<
    Pick<Rental, "id" | "title">[]
  >`DELETE FROM rentals WHERE id = ${id} AND seller = ${user_id} RETURNING *`;
  return deleted;
}
