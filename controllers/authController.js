// import crypto from 'crypto';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import sendMail from '../utils/email.js';

/*
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
    )}/api/v1/auth/verify-account/${verifyToken}`;

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

    await sendMail({
      to: newUser.email,
      subject: 'Welcome to the BookMyTicket 🙂',
      // message: `Thank you for signing up. Please verify your account by clicking the given link below:\n${verifyLink}`,
      html,
    });

    newUser.password = undefined;
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

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return next(new AppError('Incorrect email or password', 401));

    if (!user.verified) return next(new AppError('Email not verified', 401));
    user.password = undefined;

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

export const forgotPassword = async (req, res, next) => {
  try {
    // Ask for email
    // Check email is in valid format

    // Find user based on email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppError('Incorrect email address', 404));

    const resetToken = crypto.randomBytes(32).toString('hex');
    const encryptedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const resetLink = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/reset-password/${resetToken}`;

    user.passwordResetToken = encryptedResetToken;
    user.passwordResetTokenExpiresIn = new Date(Date.now() + 5000);
    await user.save({
      validateBeforeSave: true,
    });

    // Send link to reset password on the user's email
    const options = {
      to: user.email,
      subject: 'Your Password Reset Token',
      html: `<div>
              <h3>Forgot your password. Please click the given link to reset your password.</h3>

              <a href='${resetLink}'>Click here</a>
             </div>`,
    };
    await sendMail(options);

    res.status(201).json({
      status: 'success',
      message: 'Email sent successfully!',
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    // Get token from the url and encrypt it to find the user
    const { resetToken } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return next('Password are not the same', 400);

    const validResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Find user from the resetToken
    const user = await User.findOne({
      passwordResetToken: validResetToken,
      passwordResetTokenExpiresIn: { $gt: Date.now() },
    });
    if (!user) return next(new AppError('Reset link expired!', 401));

    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;
    user.password = password;
    user.passwordChangedAt = Date.now();
    await user.save({ validateBeforeSave: true });

    res.status(201).json({
      status: 'success',
      message: 'Password updated successfully!',
    });
  } catch (err) {
    next(err);
  }
};

export const allowedRoute = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('You are forbidden to get access', 403));

    next();
  };
};
*/

export const loginByEmail = async (req, res, next) => {
  try {
    // 4 digit OTP
    const OTP = String(Math.floor(Math.random() * 10000)).padStart(4, 0);
    const user = await User.create({ ...req.body, OTP });

    // Mail options
    const mailOptions = {
      to: user.email,
      subject: 'Welcome to the bookmyticket',
      html: `<div>
              <h3>Your OTP is ${OTP}</h3>
             </div>`,
    };

    // Send OTP to the user's email to verify email
    await sendMail(mailOptions);

    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    // Check email is in valid format DONE by celebrate
    const { email, OTP } = req.body;

    // Find user based on email
    const user = await User.findOne({ email });
    if (!user) return next(new AppError('User does not exist', 404));

    // Check OTP is correct
    if (user.OTP !== OTP) return next(new AppError('OTP is not correct', 400));

    // Delete OTP and verify the user
    user.OTP = undefined;
    user.verified = true;
    await user.save();

    // Generate token and allow user to login
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: process.env.JWT_SECRET_TOKEN_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      token,
      // data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const protect = async (req, res, next) => {
  try {
    // Get token from headers
    let token;
    if (req.headers?.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
      return next(
        new AppError("You're not logged in, please login to get access", 401)
      );

    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

    // Check token expired or invalid done in error handler

    // Find user after token verification
    const user = await User.findById(decode.sub);
    if (!user)
      return next(new AppError('User does not exist for this token', 401));

    // Check user changed password
    if (user.changedPasswordAt) {
      console.log(user.changedPasswordAt);
      console.log(decode.iat);

      if (user.changedPasswordAt > decode.iat)
        return next(
          new AppError('User recenlty changed password, please login again')
        );
    }

    // Set user in req object
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    // Get user based on token and update
    const { email } = req.user;

    const user = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
