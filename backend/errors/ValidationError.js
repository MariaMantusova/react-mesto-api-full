class ValidationError extends Error {
  constructor() {
    super();
    this.name = 'ValidationError';
    this.statusCode = 401;
    this.message = 'Ошибка валидации';
  }
}

module.exports = ValidationError;
