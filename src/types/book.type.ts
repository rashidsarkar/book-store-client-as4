export type BookCategory =
  | "Romance"
  | "Science Fiction"
  | "Mystery"
  | "Non-Fiction"
  | "Biography";

export interface TBook {
  name: string;
  image: string;
  price: number | string;
  author: string;
  category: BookCategory; // Use the BookCategory type here
  quantity: number;
  description?: string;
  _id: string;
  publicationYear: number;
}
