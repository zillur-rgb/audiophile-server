import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { userRole } from "../constant/user.constant";

export const userSchema = new Schema<IUser>(
  {
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
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: userRole,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model<IUser>("User", userSchema);

export default User;
