import mongoose from 'mongoose';

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
      unique: true,
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

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
