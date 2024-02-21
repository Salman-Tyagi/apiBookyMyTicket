import express from 'express';
import * as cityController from '../controllers/cityController.js';

const router = express.Router();

router.get('/', cityController.getAllCities);

router.get('/:id', cityController.getCity);

router.post('/', cityController.createCity);

router.patch('/:id', cityController.updateCity);

router.delete('/:id', cityController.delelteCity);

export default router;
