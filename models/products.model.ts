import { model, Schema } from "mongoose";
import { IProducts } from "../interfaces/products.interface";

export const productsSchema = new Schema<IProducts>({
  model: {
    type: String,
    required: [true, "Name is required!"],
    unique: true,
  },
  category: String,
  description: String,
  added_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: Number,
  sold: Number,
  created_at: Date,
  updated_at: Date,
});

const Product = model<IProducts>("Product", productsSchema);

export default Product;
