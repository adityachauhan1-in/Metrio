import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";// for login check 
import adminMiddleware from "../middlewares/adminMiddleware.js";// for Role should be Admin . 
import {
  setFareConfig,
  getActiveFareConfig,
} from "../controllers/fareAdminController.js";
import { 
  listStations,
  createStation, 
  updateStation,
} from "../controllers/stationAdminController.js";
import { getTicketStats } from "../controllers/adminDashboardController.js";

const router = express.Router();

// All routes below require authenticated admin
router.use(authMiddleware, adminMiddleware);

// Fare configuration management
router.post("/fare-config", setFareConfig);
router.get("/fare-config", getActiveFareConfig);
    
// Station management
router.get("/stations", listStations);
router.post("/stations", createStation);
router.put("/stations/:id", updateStation);

// Dashboard stats
// the time has been come 
router.get("/dashboard/tickets", getTicketStats);

export default router;

