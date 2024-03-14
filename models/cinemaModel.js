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
      enum: ['2D', '3D', 'IMAX', '4DX', 'MX4D', 'IMAX 2D'],
      required: true,
    },
    facilities: {
      type: Object,
      cancellation: Boolean,
      foodAndBeverage: Boolean,
      mTicket: Boolean,
      wheelChair: Boolean,
      reclinerSeats: Boolean,
      parking: Boolean,
      enum: ['2D', '3D', 'IMAX', '4DX', 'MX4D', 'IMAX 2D'],
      required: true,
    },
    facilities: {
      type: Object,
      cancellation: Boolean,
      foodAndBeverage: Boolean,
      mTicket: Boolean,
      wheelChair: Boolean,
      reclinerSeats: Boolean,
      parking: Boolean,
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
    movies: [
      // To store array of ids wrap in array
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    timing: {
      type: [String],
    },
    seats: {
      type: Object,
      default: {
        vip: Array.from({ length: 3 }),
        executive: Array.from({ length: 5 }),
        normal: Array.from({ length: 7 }),
      },
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

const Cinema = mongoose.model('Cinema', cinemaSchema);

export default Cinema;
