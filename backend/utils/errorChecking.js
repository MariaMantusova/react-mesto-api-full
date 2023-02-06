const ExistingEmailError = require('../errors/ExistingEmailError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const checkNotFoundError = (model) => {
  if (model === null) {
    throw new NotFoundError('NotFound');
  }
};

const handleError = (err) => {
  switch (true) {
    case err.name === 'CastError':
    case err.name === 'ValidationError': {
      return new ValidationError();
    }
    case err.name === 'NotFoundError': {
      return new NotFoundError();
    }
    case err.code === 11000: {
      return new ExistingEmailError();
    }
    default: {
      return err;
    }
  }
};

module.exports = { checkNotFoundError, handleError };
