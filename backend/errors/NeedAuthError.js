class NeedAuthError extends Error {
  constructor() {
    super();
    this.name = 'NeedAuthError';
    this.statusCode = 401;
    this.message = 'Необходима авторизация';
  }
}

module.exports = NeedAuthError;
