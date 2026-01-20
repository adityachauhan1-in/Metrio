import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { ticketBooking } from '../controllers/ticketBookingController.js'
import { getMyTicket } from '../controllers/tickHistoryController.js';
const router  = express.Router();
router.post("/book",authMiddleware,ticketBooking);
router.get("/history",authMiddleware,getMyTicket);
export default router; 