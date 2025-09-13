export interface Textbook {
  id: string;
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

export const houseTypeOptions = ["Apartment", "House", "Bedroom", "Basement"];
export type HouseType = (typeof houseTypeOptions)[number];

export interface Rental {
  id: string;
  title: string;
  seller: string;
  address: string;
  post_date: string;
  date_available: string;
  description: string;
  house_type: HouseType;
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

export interface RentalListing {
  id: string;
  seller: {
    name: string;
    contact: string;
  };
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
  amenities: string[];
  photos: string[]; // Assumes array of image URLs
}

export interface Miscellaneous {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: number;
  date_posted: string;
  images: string[];
  condition: string;
  category: string;
  listing_type: "Selling" | "Buying";
}
