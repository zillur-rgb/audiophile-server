import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces/user.interface";
import User from "./../models/user.model";
require("dotenv").config();

export const sendLoginRequest = async (payload: {
  email: string;
  password: string;
}): Promise<string> => {
  // Destructuring the email and password from the body
  const { email, password } = payload;

  // Finding if a user exists with the same email
  const user: IUser | null = await User.findOne({ email });

  /**
   * Now if user is found then
   * we will compare the user password with hashed
   * password
   * if it matches then then the value of
   * passwordCorrect will be true.
   * If it does not match or user is not found,
   * it assigns value as false
   */
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(passwordCorrect && user)) return "invalid";

  // We will use the user name and user email to create the token using jwt.
  const userForToken = {
    name: user.name,
    email: user.email,
  };

  /**
   * And now we will create a signed token
   * To sign a token it requires a payload and a secret private key
   * we will use a secret word and our userForToken as a payload
   */
  const token: string = jwt.sign(userForToken, `${process.env.SECRET}`);

  return token;
};
