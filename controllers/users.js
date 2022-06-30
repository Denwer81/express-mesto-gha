const validator = require('validator');

const User = require('../models/user');
const BadRequestErrors = require('../errors/BadRequestErrors');
const NotFoundError = require('../errors/NotFoundError');
const ServerErrors = require('../errors/ServerErrors');
const SignUpErrors = require('../errors/SingUpErrors');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => next(new ServerErrors()));
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    // .orFail(new Error('NotFound'))
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => {
      // console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      if (err.name === 'CastError') {
        return next(new BadRequestErrors());
      }
      if (err.name === 'NotFound') {
        return next(new NotFoundError());
      }
      return next(new ServerErrors());
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  const isEmail = validator.isEmail(email);

  if (isEmail) {
    User.create(
      {
        email, password, name, about, avatar,
      },
    )
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new BadRequestErrors());
        }
        if (err.code === 11000) {
          return next(new SignUpErrors());
        } return next(new ServerErrors());
      });
  } else {
    return next(new BadRequestErrors());
  }
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErrors());
      } return next(new ServerErrors());
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErrors());
      } return next(new ServerErrors());
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
