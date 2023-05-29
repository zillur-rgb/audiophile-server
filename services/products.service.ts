import { getTokenFrom } from "./../utils/checkToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import Product from "../models/products.model";
import { IProducts } from "../interfaces/products.interface";
import User from "../models/user.model";
import { Request } from "express";

// Adding product to database
export const addAProductToDB = async (
  payload: IProducts,
  request: Request
): Promise<IProducts | string> => {
  // Decoding the token that has been sent when sending POST request
  const decodedToken = jwt.verify(
    getTokenFrom(request)!,
    `${process.env.SECRET}`
  ) as JwtPayload;

  // If decoded token does not match with the user then invalid request
  if (!decodedToken) {
    return "Invalid request";
  }

  console.log("decodedToken", decodedToken);

  // Fetching the user from the added_by of the body
  const user = await User.findOne({ email: decodedToken.email });

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

// Getting all products from database and the user email of seller
export const getProductsUsingPageFromDB = async (queries: {
  skip?: number;
  limit?: number;
}): Promise<IProducts[]> => {
  // Now we will use the skip and limit to get the data based on the page
  const allProducts = Product.find()
    .skip(queries.skip!)
    .limit(queries.limit!)
    .populate("added_by", { email: 1 });

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
  payload: any,
  req: Request
): Promise<IProducts | null | string> => {
  try {
    // Extracting the decoded token
    const decodedToken = jwt.verify(
      getTokenFrom(req)!,
      `${process.env.SECRET}`
    ) as JwtPayload;

    // If decoded token does not match with the user then invalid request
    if (!decodedToken) {
      return "Invalid request";
    }

    // Fetching the user
    const user = await User.findOne({ email: decodedToken.email });

    // Fetching the product using the id to compare
    const product = await Product.findOne({ _id: id });

    if (user?._id.toString() === product?.added_by.toString()) {
      const filter = { _id: id };
      const update = payload;
      const updatedProduct = await Product.findByIdAndUpdate(filter, update, {
        new: true,
      });

      return updatedProduct;
    }
    if (!user || !product) {
      return "Invalid request";
    }

    // If none of the conditions for deletion are met
    return "Access denied";
  } catch (error) {
    console.error("Error deleting data:", error);
    return "Error deleting data";
  }
};

/**
 * Deleting data with DELETE request
 * @param productId is the id of the product we want to delete
 * @param request request will be use for extracting token from the authorization
 * @returns the deleted data
 */
export const deleteSingleDatFromDB = async (id: string, payload: Request) => {
  try {
    // Extracting the decoded token
    const decodedToken = jwt.verify(
      getTokenFrom(payload)!,
      `${process.env.SECRET}`
    ) as JwtPayload;

    // If decoded token does not match with the user then invalid request
    if (!decodedToken) {
      return "Invalid request";
    }

    // Fetching the user
    const user = await User.findOne({ email: decodedToken.email });

    // Fetching the product using the id to compare
    const product = await Product.findOne({ _id: id });

    if (user?._id.toString() === product?.added_by.toString()) {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return deletedProduct;
    }

    if (!user || !product) {
      return "Invalid request";
    }

    // If none of the conditions for deletion are met
    return "Access denied";
  } catch (error) {
    console.error("Error deleting data:", error);
    return "Error deleting data";
  }
};
