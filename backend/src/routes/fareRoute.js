import express from 'express'
import {calculateFare} from '../controllers/fareController.js'

const router = express.Router();

router.post("/fare",calculateFare)

export default router;

