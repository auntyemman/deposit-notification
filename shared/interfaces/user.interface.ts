import { Schema, Document, model, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  mobileNumber: string;
  walletBalance: number;
  notificationType: "email" | "mobile";
}

// export interface IUser {
//   id?: string;
//   username: string;
//   email: string;
//   mobileNumber: string;
//   walletBalance: number;
//   notificationType: "email" | "mobile";
// }
