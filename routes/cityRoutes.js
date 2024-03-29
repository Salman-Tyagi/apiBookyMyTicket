import express from 'express';
import * as cityController from '../controllers/cityController.js';
import uploadImg from '../middleware/multer.js';

const router = express.Router();

router.get('/', cityController.getAllCities);

router.get('/:id', cityController.getCity);

// upload.single() only to uplaod a single image
router.post('/', uploadImg.single('image'), cityController.createCity);

router.patch('/:id', cityController.updateCity);

router.delete('/:id', cityController.delelteCity);

export default router;
