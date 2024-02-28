import Cinema from '../models/cinemaModel.js';

export const getAllCinemas = async (req, res, next) => {
  try {
    const cinemas = await Cinema.find();

    res.status(200).json({
      status: 'success',
      count: cinemas.length,
      data: cinemas,
    });
  } catch (err) {
    next(err);
  }
};

export const createCinema = async (req, res, next) => {
  try {
    const newCinema = await Cinema.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newCinema,
    });
  } catch (err) {
    next(err);
  }
};

export const getCinema = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinema = await Cinema.findOne({ _id: id });

    res.status(200).json({
      status: 'success',
      data: cinema,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCinema = async (req, res, next) => {
  try {
    const cinema = await Cinema.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(201).json({
      status: 'success',
      data: cinema,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCinema = async (req, res, next) => {
  try {
    await Cinema.findOneAndDelete({ _id: req.params.id });

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};
