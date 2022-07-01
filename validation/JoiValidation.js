const { Joi } = require('celebrate');

const urlRegEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

const id = Joi.string().required().hex().length(24);

const signInValidation = {
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
};

const signUpValidtion = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegEx),
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
    avatar: Joi.string().required().regex(urlRegEx),
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
    link: Joi.string().required().regex(urlRegEx),
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
