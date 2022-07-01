const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestErrors = require('../errors/BadRequestErrors');
const NotFoundError = require('../errors/NotFoundError');

// const {
//   signUpValidtion,
// } = require('../validation/JoiValidation');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  // console.log(signUpValidtion);
  const {
    email, password, name, about, avatar,
  } = req.body;

  const isEmail = validator.isEmail(email);

  if (isEmail) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create(
        {
          email, password: hash, name, about, avatar,
        },
      ))
      .then((user) => {
        res.send({
          _id: user._id, name: user.name, email: user.email, about: user.about, avatar: user.avatar,
        });
      })
      .catch(next);
  } else {
    next(new BadRequestErrors());
  }
};

// const login = (req, res) => {
//   const { email, password } = req.body;

//   // ...
// };

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
