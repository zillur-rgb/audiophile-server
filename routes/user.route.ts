import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controller";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/", getAllUsers);

export default router;
