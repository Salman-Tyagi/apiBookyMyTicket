import { isCelebrateError } from 'celebrate';
import AppError from '../utils/appError.js';

const handleDuplicateError = err =>
  new AppError(`Duplicate ${JSON.stringify(err.keyPattern)}`, 400);

const handleJWTError = () => new AppError('Invalid token, login again', 401);

const handleJWTExpiredError = () =>
  new AppError('Token expired! Login again', 401);

const sendErrDev = (err, res) => {
  console.log(err);

  if (isCelebrateError(err)) {
    return res.status(400).json({
      status: err.status || 'error',
      message: Array.from(err.details).flat().at(1).details.at(0).message,
      stack: err.stack,
    });
  }

  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrPro = (err, res) => {
  console.log(err);

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

export default (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') sendErrDev(err, res);

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.code === 11000) error = handleDuplicateError(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrPro(error, res);
  }
};
