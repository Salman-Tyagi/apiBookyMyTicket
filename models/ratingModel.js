import mongoose from 'mongoose';
import Movie from './movieModel.js';

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    vote: {
      type: Number,
    },
    review: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  },
  {
    versionKey: false,
  }
);

ratingSchema.index({ user: 1, movie: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
