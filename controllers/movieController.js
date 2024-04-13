import Movie from '../models/movieModel.js';

export const getAllMovies = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };

    // Filtering
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    const queryStr = JSON.stringify(queryObj).replace(
      /b\lt|lte|gt|gte\b/g,
      match => `$${match}`
    );

    let query = Movie.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('createdAt');
    }

    // Projection
    if (req.query.fields) {
      const projectBy = req.query.fields.split(',').join(' ');
      query = query.select(projectBy);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const movies = await query;

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
