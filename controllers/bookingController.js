import moment from 'moment';
import Booking from '../models/bookingModel.js';
import Cinema from '../models/cinemaModel.js';
import Movie from '../models/movieModel.js';

import AppError from '../utils/appError.js';

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
    const { screen, movieId } = req.query;

    const movie = await Movie.findOne({ _id: movieId });
    if (!movie)
      return next(
        new AppError(
          'Currently, this movie is not premiere in any theatre',
          400
        )
      );

    const timings = [];
    const currentDateWithTime = moment();
    let time = currentDateWithTime.format('LT').toString().padStart(8, 0);

    for (let i = 0; i < process.env.SHOWS_PER_DAY; i++) {
      timings.push(time);

      time = String(currentDateWithTime.add(4, 'hours').format('LT')).padStart(
        8,
        0
      );
    }

    const { acknowledged, matchedCount, modifiedCount, upsertedCount } =
      await Cinema.updateMany(
        {
          screen: {
            $in: [screen],
          },
        },
        {
          $set: {
            movies: movieId,
            timing: timings,
          },
        }
      );

    if (matchedCount === 0 && modifiedCount === 0 && upsertedCount === 0)
      return next(new AppError(`Movie not availbale in ${screen}`, 400));

    res.status(201).json({
      status: 'success',
      message: `Cinemas updated for ${screen} movie!`,
    });
  } catch (err) {
    next(err);
  }
};

export const checkSeats = async (req, res, next) => {
  try {
    const { seatType, seatNum, cinemaName, location } = req.query;

    const seat = `seats.${seatType}.${seatNum - 1}`;
    const cinema = await Cinema.findOneAndUpdate(
      {
        name: cinemaName,
        location,
        [seat]: false,
      },
      {
        $set: {
          [seat]: true,
        },
      }
    );

    if (!cinema) return next(new AppError('Seats already booked', 400));

    res.status(201).json({
      status: 'success',
      message: `${seat} booked successfully! Please pay the ticket amount`,
    });
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const newBooking = await Booking.create({
      // cinema,
      // movie,
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
