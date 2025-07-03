export interface HouseView {
  id: number;
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
}
