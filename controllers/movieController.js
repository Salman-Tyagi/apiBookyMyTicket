import Movie from '../models/movieModel.js';

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();

    res.status(200).json({
      status: 'success',
      count: movies.length,
      data: movies,
    });
  } catch (err) {
    next(err);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const payload = req.body;
    const movie = await Movie.create(payload);

    res.status(201).json({
      status: 'success',
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    res.status(200).json({
      status: 'success',
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const movie = await Movie.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};
