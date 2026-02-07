import express from 'express'
import { calculateFare } from '../controllers/fareController.js'
import { listStations } from '../controllers/stationAdminController.js'

const router = express.Router();

router.post("/fare", calculateFare);
router.get("/stations", listStations);

export default router;

