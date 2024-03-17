import express from 'express';
import * as ratingController from '../controllers/ratingController.js';
import * as authController from '../controllers/authController.js';
import * as validate from '../middleware/validate.js';

const router = express.Router();

router.get('/', ratingController.getAllRatings);

router.use(authController.protect);

router.post('/:id', validate.createUpdateRating, ratingController.createRating);
router.get('/:id', ratingController.getRating);

router.patch(
  '/:id',
  validate.createUpdateRating,
  ratingController.updateRating
);

router.delete('/:id', ratingController.deleteRating);

export default router;
