import express from 'express';
import * as validate from '../middleware/validate.js';
import * as movieController from '../controllers/movieController.js';
import uploadImg from '../middleware/multer.js';

const router = express.Router();

router.get('/', movieController.getMovies);

router.post(
  '/',
  uploadImg.array('images', 2),
  validate.createMovie,
  movieController.createMovie
);

router.get('/:id', movieController.getMovie);

router.patch('/:id', movieController.updateMovie);

router.delete('/:id', movieController.deleteMovie);

export default router;
