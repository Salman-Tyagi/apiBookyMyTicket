import { isCelebrateError } from 'celebrate';

export default (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message;
  const status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    if (isCelebrateError(err)) {
      return res.status(400).json({
        status,
        message: Array.from(err.details).flat().at(1).details.at(0).message,
        stack: err.stack,
      });
    }

    return res.status(statusCode).json({
      status,
      message,
      error: err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    if (err.isOperational) {
      res.status(statusCode).json({
        status,
        message,
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Something went wrong',
      });
    }
  }
};
