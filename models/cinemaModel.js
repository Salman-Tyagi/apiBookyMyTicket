import mongoose from 'mongoose';

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    screen: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    movies: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  },
  {
    versionKey: false,
  }
);

const Cinema = mongoose.model('Cinema', cinemaSchema);

export default Cinema;
