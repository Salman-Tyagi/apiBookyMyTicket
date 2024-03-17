import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.get(
  '/',
  authController.protect,
  authController.allowedTo('admin', 'user'),
  bookingController.getAllBookings
);

router.post(
  '/init-booking',
  authController.protect,
  bookingController.initBooking
);

router.post(
  '/check-seats',
  authController.protect,
  bookingController.checkSeats
);

router.post('/', authController.protect, bookingController.createBooking);
router.get('/:id', authController.protect, bookingController.getBooking);
router.patch('/:id', authController.protect, bookingController.updateBooking);
router.delete('/:id', authController.protect, bookingController.deleteBooking);

export default router;
