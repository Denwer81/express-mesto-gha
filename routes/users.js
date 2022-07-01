const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  getProfile,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  updateProfileValidation,
  updateAvatarValidation,
} = require('../validation/JoiValidation');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUser);

usersRouter.get('/me', getProfile);

usersRouter.patch('/me', celebrate(updateProfileValidation), updateProfile);

usersRouter.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = usersRouter;
