import express from "express";
import { sendLoginRequestController } from "../controllers/login.controller";

const router = express.Router();

router.post("/", sendLoginRequestController);

export default router;
