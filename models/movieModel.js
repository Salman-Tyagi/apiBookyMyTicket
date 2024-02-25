import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    // poster: {
    //   type: String,
    //   required: true,
    // },
    // coverImage: {
    //   type: String,
    //   required: true,
    // },
    video: {
      type: String,
      // required: true,
    },
    rating: {
      type: Number,
      // default: 4.5,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      required: true,
    },
    screenType: {
      type: [String],
      enum: ['2D', '3D', '4DX', 'MX4D', 'IMAX 2D'],
      // default: ['2D'],
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    certification: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    cast: {
      type: Object,
      actor: String,
      actoress: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
