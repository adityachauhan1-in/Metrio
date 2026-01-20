import express from 'express';
import adminMiddleware from '../middlewares/adminMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import {scanTicket} from '../controllers/qrScanController.js'
const router = express.Router();

router.post("/scan", authMiddleware, adminMiddleware, scanTicket);

export default router;