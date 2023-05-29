import {
  addAProductToDB,
  deleteSingleDatFromDB,
  getAllProductsFromDB,
  getProductsUsingPageFromDB,
  getSingleProductFromDB,
  updateSingleDataInDB,
} from "../services/products.service";
import { Request, Response } from "express";

// Creating product
export const createAProduct = async (req: Request, res: Response) => {
  const createdProduct = await addAProductToDB(req.body, req);

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

// Getting all the products with pagination
export const getAllProductsForAPage = async (req: Request, res: Response) => {
  try {
    const queries: { skip?: number; limit?: number } = {};
    if (req.query.page) {
      // Here page and limit from query will be extracted
      // If page number and limit are missing then the default values will be 0 and 5
      const { page = "1", limit = "5" } = req.query;

      /**
       * In order to find the correct data based on the page number we have to have a skip value so that for a specific page it can skip some data to display.
       * 50 products
       * page 1 => 1 - 5
       * page 2 => 6- 10
       * page 3 => 11 - 15
       * page 4 => 16 - 20
       * So if we pass page number query parameters as 3, we need to skip first 10 data.
       */
      const skip = ((Number(page) - 1) * Number(limit)) | 0;

      // Now we have a query object where  we will add this query
      queries.skip = skip;
      queries.limit = Number(limit);
    }
    const allProducts = await getProductsUsingPageFromDB(queries);

    res.status(200).json({
      status: 200,
      count: allProducts.length,
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

    const updatedProduct = await updateSingleDataInDB(id, payload, req);
    if (updatedProduct === "Invalid request") {
      res.status(400).json({
        status: 400,
        message: "No product found",
      });
    }
    if (updatedProduct === "Access denied") {
      res.status(401).json({
        status: 401,
        message: "Forbidden",
      });
    }
    res.status(200).json({
      status: 200,
      message: "Updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Error occurred", error);
  }
};

// Deleting operation
export const deleteSingleData = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const deletedProduct = await deleteSingleDatFromDB(productId, req);

  if (deletedProduct === "Invalid request") {
    res.status(401).json({
      message: "forbidden",
    });
  } else {
    res.status(200).json({
      message: "Succesfully deleted",
      data: deletedProduct,
    });
  }
};
