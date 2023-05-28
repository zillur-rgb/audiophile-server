import {
  addAProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleDataInDB,
} from "./../services/procuts.services";
import { Request, Response } from "express";

// Creating product
export const createAProduct = async (req: Request, res: Response) => {
  const createdProduct = await addAProductToDB(req.body);

  res.status(200).json({
    status: 200,
    message: "success",
    data: createdProduct,
  });
};

// Getting all the products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await getAllProductsFromDB();

    res.status(200).json({
      status: 200,
      data: allProducts,
    });
  } catch (error) {
    console.log("Error happened when fetching data: ", error);
  }
};

// Getting single product
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const singleProduct = await getSingleProductFromDB(id);

    res.status(200).json({
      status: 200,
      data: singleProduct,
    });
  } catch (error) {
    console.log("Error occurred: ", error);
  }
};

// Updating single data

export const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updatedProduct = await updateSingleDataInDB(id, payload);

    res.status(200).json({
      status: 200,
      message: "Updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Error occurred", error);
  }
};
