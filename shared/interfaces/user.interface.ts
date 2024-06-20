export interface IUser {
  id: string;
  username: string;
  email: string;
  mobileNumber: string;
  walletBalance: number;
  notificationType: "email" | "mobile";
}
