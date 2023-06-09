class AppError extends Error {
  statusCode;

  constructor(message, statusCode = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
