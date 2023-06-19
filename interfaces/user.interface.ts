export interface IUser {
  email: string;
  name: string;
  passwordHash: string;
  address: string;
  dateOfBirth: string;
  role: IUserRole;
  products?: any;
}

export type IUserRole = "seller" | "buyer" | "admin";
