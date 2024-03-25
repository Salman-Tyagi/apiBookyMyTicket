import User from '../models/userModel.js';

export const findUsers = async () => {
  const users = await User.find();
  return users;
};
