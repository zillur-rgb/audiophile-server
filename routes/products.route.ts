import express from "express";
import {
  createAProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
} from "../controllers/products.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", updateSingleProduct);
router.post("/", createAProduct);

export default router;
