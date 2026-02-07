import express from "express";
import { createFeedBack } from "../controllers/userFeedbackControlleer.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/feedback", authMiddleware, createFeedBack);

export default router;