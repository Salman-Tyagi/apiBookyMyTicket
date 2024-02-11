import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import sendMail from '../utils/email.js';

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return next(new AppError('Email already exists', 400));

    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    const verifyToken = jwt.sign(
      { sub: newUser._id },
      process.env.VERIFY_TOKEN_SECRET,
      { expiresIn: process.env.VERIFY_TOKEN_EXPIRES_IN }
    );

    const verifyLink = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/verify-account/${verifyToken}`;

    const html = `<div style='padding: 2rem 0'>
                    <h2 style='font-size: 1.6rem;
                      margin: 0;'>
                      Welcome to the BookMyTicket
                    </h2>

                    <p style='font-size: 1.4rem;
                      margin: 0;
                      margin-block: 1rem;'>
                      Please verify your account on simply clicking the given   button
                    </p>

                    <a style='display: inline-block;
                      text-decoration: none;
                      color: #fff;
                      background: #d63131;
                      padding: 0.4em 0.8rem;
                      border-radius: 0.2rem;
                      font-size: 1.1rem;
                      font-weight: bold;' href='${verifyLink}'>Click here
                    </a>
                  </div>`;

    try {
      await sendMail({
        to: newUser.email,
        subject: 'Welcome to the BookMyTicket 🙂',
        // message: `Thank you for signing up. Please verify your account by clicking the given link below:\n${verifyLink}`,
        html,
      });
    } catch (err) {
      console.log(err);
    }

    newUser.password = undefined;
    newUser.verified = undefined;
    newUser.createdAt = undefined;

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyAccount = async (req, res, next) => {
  try {
    const { verifyToken } = req.params;

    const decode = jwt.verify(verifyToken, process.env.VERIFY_TOKEN_SECRET);

    const user = await User.findOneAndUpdate(
      { _id: decode.sub },
      { verified: true },
      { new: true, runValidators: true }
    ).select('name email');

    res.status(201).json({
      status: 'success',
      data: user,
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

    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new AppError('Incorrect email or password', 400));

    const validPassword = await user.correctPassword(password);
    if (!validPassword)
      return next(new AppError('Incorrect email or password', 400));

    if (!user.verified) return next(new AppError('Email not verified', 402));

    user.password = undefined;
    user.verified = undefined;
    user.createdAt = undefined;

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      token,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
