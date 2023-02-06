require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkNotFoundError } = require('../utils/errorChecking');

const getUsers = (req, res, next) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(next);

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    checkNotFoundError(user);
    return res.status(200).send({ data: user });
  })
  .catch(next);

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    checkNotFoundError(user);
    return res.status(200).send({ data: user });
  })
  .catch(next);

const createUser = ((req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      checkNotFoundError({ user });
      return res.status(200).send(user.toObject({
        // eslint-disable-next-line no-shadow
        transform: (doc, res) => {
          delete res.password;
          return res;
        },
      }));
    })
    .catch(next);
});

function changeInfo(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      checkNotFoundError(user);
      return res.status(200).send({ data: user });
    })
    .catch(next);
}

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      checkNotFoundError(user);
      return res.status(200).send({ data: user });
    })
    .catch(next);
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
        })
        .send({ jwt: token });
    })
    .catch(next);
};

module.exports = {
  getUsers, getUserById, createUser, changeInfo, changeAvatar, login, getCurrentUser,
};
