import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  passwordHash: String,
  address: String,
  dateOfBirth: String,
  role: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  created_at: Date,
  updated_at: Date,
});

const User = model<IUser>("User", userSchema);

export default User;
