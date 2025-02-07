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
  address?: string;
};
type PaymentMethod = "stripe" | "cash";
export enum OrderStatus {
  PENDING = "pending",
  CONFIRM = "confirm",
  CANCEL = "cancel",
  DELIVERED = "delivered",
}
export interface TOrderData {
  product: TBook | string;
  quantity: number;
  userId: TUserFromDB | string;
  paymentMethod: PaymentMethod;
  totalPrice: number;
}

export interface TOrder {
  _id: string;
  paymentMethod: PaymentMethod;
  product: TBook;
  quantity: number;
  userId: TUserFromDB;
  totalPrice: number;
  transactionId?: string;
  status: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
