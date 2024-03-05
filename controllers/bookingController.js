import Booking from '../models/bookingModel.js';
import Cinema from '../models/cinemaModel.js';

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      status: 'success',
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

export const initBooking = async (req, res, next) => {
  try {
    const { screen, movie } = req.query;

    const movieCinemas = await Cinema.updateMany(
      {
        screen: {
          $in: [screen],
        },
      },
      {
        $set: {
          movies: movie,
        },
      },
      { multi: true }
    );

    res.status(201).json({
      status: 'success',
      count: movieCinemas.length,
      data: movieCinemas,
    });
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const newBooking = await Booking.create({
      cinema,
      movie,
    });

    res.status(201).json({
      status: 'success',
      data: newBooking,
    });
  } catch (err) {
    next(err);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { cinema, movie },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      status: 'success',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};
