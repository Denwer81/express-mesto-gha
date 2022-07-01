const { Joi } = require('celebrate');

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

const id = Joi.string().required().alphanum().length(24);

const signInValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const signUpValidtion = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
  }),
};

const updateProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const updateAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegex),
  }),
};

const getUserValidation = {
  params: Joi.object().keys({
    userId: id,
  }),
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),
};

const cardValidation = {
  params: Joi.object().keys({
    cardId: id,
  }),
};

module.exports = {
  signInValidation,
  signUpValidtion,
  updateProfileValidation,
  updateAvatarValidation,
  getUserValidation,
  createCardValidation,
  cardValidation,
};
