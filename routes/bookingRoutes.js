import express from 'express';
import * as bookingController from '../controllers/bookingController.js';

const router = express.Router();

router.post('/init-booking', bookingController.initBooking);

export default router;
