import { model, Schema } from "mongoose";
import { IProducts } from "../interfaces/products.interface";
import { categories } from "../constant/products.constant";

export const productsSchema = new Schema<IProducts>(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Category is required!"],
      enum: categories,
    },
    features: {
      type: [String],
      required: [true, "features is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Product = model<IProducts>("Product", productsSchema);

export default Product;
