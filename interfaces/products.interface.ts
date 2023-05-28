export interface IProducts {
  model: string;
  category: "Headphones" | "Earphones" | "Speakers";
  description: string;
  added_by: string;
  image: string;
  price: number;
  quantity: number;
  sold: number;
  created_at: Date;
  updated_at: Date;
}
