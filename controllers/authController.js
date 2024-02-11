import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

export const signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError('Email or password is required', 400));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError('Incorrect email or password', 400));

    if (password !== user.password)
      return next(new AppError('Incorrect email or password', 400));

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
