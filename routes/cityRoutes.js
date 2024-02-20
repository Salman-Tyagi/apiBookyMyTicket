import express from 'express';
import * as cityController from '../controllers/cityController.js';

const router = express.Router();

router.get('/cities', cityController.getAllCities);

router.get('/city/:id', cityController.getCity);

router.post('/city', cityController.createCity);

router.patch('/city/:id', cityController.updateCity);

router.delete('/city/:id', cityController.delelteCity);

export default router;
