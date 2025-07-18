export interface Textbook {
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

export interface Rental {
  id: number;
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
  images: string[]; // Assumes array of image URLs
}
