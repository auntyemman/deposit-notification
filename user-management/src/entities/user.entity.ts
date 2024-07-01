import { Schema, Document, model, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  mobileNumber: string;
  walletBalance: number;
  notificationType: "email" | "mobile";
}

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  walletBalance: { type: Number, required: true, default: 0 },
  notificationType: { type: String, enum: ["email", "mobile"], required: true },
});

export const User: Model<IUser> = model<IUser>("User", UserSchema);
// export const User: Model<IUser> = model<IUser>('User', userSchema);


// import { IUser } from "../../../shared/interfaces/user.interface";
// export class User implements IUser {
//   constructor(
//     public id: string,
//     public username: string,
//     public email: string,
//     public mobileNumber: string,
//     public walletBalance: number,
//     public notificationType: "email" | "mobile",
//   ) {}
// }
