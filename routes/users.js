const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  signUpValidtion,
  updateProfileValidation,
  updateAvatarValidation,
} = require('../validation/JoiValidation');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUser);

usersRouter.post('/', celebrate(signUpValidtion), createUser);

usersRouter.patch('/me', celebrate(updateProfileValidation), updateProfile);

usersRouter.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = usersRouter;
