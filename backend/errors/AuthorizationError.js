class AuthorizationError extends Error {
  constructor() {
    super();
    this.name = 'AuthorizationError';
    this.statusCode = 401;
    this.message = 'Неправильные логин или пароль';
  }
}

module.exports = AuthorizationError;
