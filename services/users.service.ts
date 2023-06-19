import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";

export const createUserInDB = async (payload: any): Promise<IUser> => {
  const { email, name, password, address, dateOfBirth, role } = payload;
  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = new User<IUser>({
    email,
    name,
    passwordHash,
    address,
    dateOfBirth,
    role,
  });

  const savedUser = user.save();

  return savedUser;
};

// Get all users from DB
export const getAllUsersFromDB = async (): Promise<IUser[]> =>
  await User.find().populate("products");
