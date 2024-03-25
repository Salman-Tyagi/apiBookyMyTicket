import User from '../models/userModel.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
