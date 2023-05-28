export interface IUser {
  email: string;
  name: string;
  passwordHash: string;
  address: string;
  dateOfBirth: string;
  role: string;
  products?: any;
  created_at: Date;
  updated_at: Date;
}
