import mongoose from 'mongoose';
import Movie from '../models/movieModel.js';
import Rating from '../models/ratingModel.js';

export const calcMovieRatingAvg = async movieId => {
  const averageRating = await Rating.aggregate([
    {
      $match: { movie: new mongoose.Types.ObjectId(movieId) },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$rating' },
      },
    },
    {
      $project: {
        avgRating: {
          $round: ['$avgRating', 1],
        },
      },
    },
  ]);

  if (!averageRating.length) return;

  await Movie.findOneAndUpdate(
    { _id: movieId },
    {
      $set: {
        rating: averageRating[0].avgRating,
      },
    }
  );
};
