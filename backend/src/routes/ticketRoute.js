import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { ticketBooking } from '../controllers/ticketBookingController.js'
import { getMyTicket } from '../controllers/tickHistoryController.js';
const router  = express.Router();
router.post("/tickets/book",authMiddleware,ticketBooking);
router.get("/ticket/My",authMiddleware,getMyTicket);
export default router;