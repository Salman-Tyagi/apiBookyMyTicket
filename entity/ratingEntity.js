import Rating from '../models/ratingModel.js';

export const find = async () => await Rating.find();

export const findOne = async query => await Rating.findOne(query);
