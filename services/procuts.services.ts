import Product from "../models/products.model";
import { IProducts } from "./../interfaces/products.interface";

// Adding product to database
export const addAProductToDB = async (
  payload: IProducts
): Promise<IProducts> => {
  const createdProduct = new Product(payload);

  await createdProduct.save();
  return createdProduct;
};

// Getting all products from database
export const getAllProductsFromDB = async (): Promise<IProducts[]> => {
  const allProducts = Product.find();

  return allProducts;
};

// Getting single product from DB based on id
export const getSingleProductFromDB = async (
  id: string
): Promise<IProducts | null> => {
  const singleProduct = await Product.findById({ _id: id });
  return singleProduct;
};

// Updating data with PUT request
export const updateSingleDataInDB = async (
  id: string,
  payload: any
): Promise<IProducts | null> => {
  const filter = { _id: id };
  const update = payload;
  const updatedProduct = await Product.findByIdAndUpdate(filter, update, {
    new: true,
  });

  return updatedProduct;
};
