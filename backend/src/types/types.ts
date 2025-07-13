export type RentalListing = {
  id: string;
  title: string;
  price: string;
  location: string;
  image?: string;
  description: string;
  details: {
    available: string;
    lease: string;
  };
  amenities: string[];
  seller: {
    name: string;
    contact: string;
  };
};

export interface Rental {
  id: string;
  seller: string;
  address: string;
  post_date: string;
  date_available: string;
  description: string;
  house_type: string;
  cost: number;
  num_beds: number;
  is_cost_per_room: boolean;
  is_utilities_included: boolean;
  is_sublet: boolean;
  has_laundry: boolean;
  has_cooking: boolean;
  has_parking: boolean;
  no_smoking: boolean;
  is_shared: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "user" | "admin" | "banned";
}
