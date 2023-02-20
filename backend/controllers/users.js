require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ExistingEmailError = require('../errors/ExistingEmailError');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .orFail(() => new NotFoundError('Пользователь не найден'))
  .then((user) => res.status(200).send({ data: user }))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ValidationError());
    } else {
      next(err);
    }
  });

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => res.status(200).send({ data: user }))
  .catch(next);

const createUser = ((req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send(user.toObject({
      // eslint-disable-next-line no-shadow
      transform: (doc, res) => {
        delete res.password;
        return res;
      },
    })))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistingEmailError());
      } else if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
});

function changeInfo(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
}

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers, getUserById, createUser, changeInfo, changeAvatar, login, getCurrentUser,
};
