import { IUser } from "../../../shared/interfaces/user.interface";
export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public mobileNumber: string,
    public walletBalance: number,
    public notificationType: "email" | "mobile",
  ) {}
}
