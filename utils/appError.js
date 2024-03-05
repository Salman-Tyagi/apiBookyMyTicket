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

// const AppError2 = function (message, statusCode) {
//   this.message = message;
//   this.statusCode = statusCode;
//   this.status = 'fail';
//   this.isOperational = true;
// };

// AppError2.prototype.hi = function () {
//   return this.message;
// };

// const err = new AppError2('Invalid checking message', 100);
// console.log(err.hi());

// console.log(err.__proto__.__proto__.__proto__);
