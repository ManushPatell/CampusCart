export interface HouseView {
  id: number;
  title: string;
  price: string;
  address: string;
  image?: string;
  description: string;
  date_posted: string;
  house_type: string;
  utilities_included: boolean;
  number_of_beds: number;
  sublet: boolean;
  details: {
    available: string;
  };
  amenities: string[];
  seller: {
    name: string;
    contact: string;
  };
}
