import { Types } from "mongoose";
import { TBook } from "./book.type";

export type TUserFromDB = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export interface TOrderData {
  product: TBook | string;
  quantity: number;
  userId: TUserFromDB | string;
  paymentMethod: "cash" | "stripe";
  totalPrice: number;
}
