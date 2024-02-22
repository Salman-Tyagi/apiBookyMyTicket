import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  city: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const City = mongoose.model('City', citySchema);

export default City;
