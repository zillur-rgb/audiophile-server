import Product from "../models/products.model";
import { IProducts } from "../interfaces/products.interface";
import User from "../models/user.model";

// Adding product to database
export const addAProductToDB = async (
  payload: IProducts
): Promise<IProducts> => {
  // Fetching the user from the added_by of the body
  const user = await User.findById(payload.added_by);

  // Adding the user._id to the new product object
  const newProduct = new Product({ ...payload, added_by: user?._id });

  // Saving the product
  const createdProduct = await newProduct.save();
  // And then adding the newProduct _id to the user.products content
  user!.products = user?.products?.concat(createdProduct._id);
  // then saving the user again
  await user?.save();
  return createdProduct;
};

// Getting all products from database
export const getAllProductsFromDB = async (): Promise<IProducts[]> => {
  const allProducts = Product.find();

  return allProducts;
};

// Getting all products from database
export const getProductsUsingPageFromDB = async (queries: {
  skip?: number;
  limit?: number;
}): Promise<IProducts[]> => {
  // Now we will use the skip and limit to get the data based on the page
  const allProducts = Product.find().skip(queries.skip!).limit(queries.limit!);

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
