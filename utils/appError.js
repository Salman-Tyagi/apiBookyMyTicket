class AppError extends Error {
  constructor(message, statusCode = 500) {
    super();

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.message = message;
    this.isOperational = true;
  }
}

export default AppError;
