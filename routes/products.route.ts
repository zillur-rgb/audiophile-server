import express from "express";
import {
  createAProduct,
  deleteSingleData,
  getAllProducts,
  getAllProductsForAPage,
  getSingleProduct,
  updateSingleProduct,
} from "../controllers/products.controller";

const router = express.Router();

// router.get("/", getAllProducts);
router.get("/", getAllProductsForAPage);
router.get("/:id", getSingleProduct);
router.put("/:id", updateSingleProduct);
router.post("/create-product", createAProduct);
router.delete("/:productId", deleteSingleData);

export default router;
