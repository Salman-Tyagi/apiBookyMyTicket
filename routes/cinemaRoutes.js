import express from 'express';
import * as validate from '../middleware/validate.js';
import * as cinemaController from '../controllers/cinemaController.js';

const router = express.Router();

router.get('/', cinemaController.getAllCinemas);
router.post('/', validate.createCinema, cinemaController.createCinema);

router.get('/:id', cinemaController.getCinema);
router.patch('/:id', cinemaController.updateCinema);
router.delete('/:id', cinemaController.deleteCinema);

export default router;
