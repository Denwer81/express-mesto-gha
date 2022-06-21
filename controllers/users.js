const User = require('../models/user');

const getUsers = (_, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
