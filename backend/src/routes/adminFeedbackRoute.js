import express from "express";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAllFeedback, reviewFeedback } from "../controllers/adminFeedbackControllers.js";

const router = express.Router();

router.get("/feedback", authMiddleware, adminMiddleware, getAllFeedback);
router.patch("/feedback/:id/review", authMiddleware, adminMiddleware, reviewFeedback);

export default router;
