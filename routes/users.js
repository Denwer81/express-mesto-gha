const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  signUpValidtion,
} = require('../validation/JoiValidation');

// const signUpValidtion = {
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string(),
//   }),
// };

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUser);

usersRouter.post('/', createUser);

usersRouter.patch('/me', updateProfile);

usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
