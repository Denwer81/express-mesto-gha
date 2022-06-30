// const AuthError = require('../errors/AuthErrors');
const BadRequestErrors = require('../errors/BadRequestErrors');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerErrors');
const SignUpError = require('../errors/SignUpErrors');

const errors = (err, _, res, next) => {
  // console.log(err);
  // console.log(err.name);
  // console.log(err.code);
  // console.log(err.message);

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    throw new BadRequestErrors();
  }
  if (err.code === 11000) {
    throw new SignUpError();
  }
  if (err.name === 'NotFound') {
    throw new NotFoundError();
  }
  if (!err.name && !err.name && !err.status) {
    throw new ServerError();
  } else {
    res.status(err.code).send(err.message);
  }

  next();
};

const handleError = (err, _, res, next) => {
  res.status(err.code).send(err.message);

  next();
};

module.exports = {
  errors,
  handleError,
};
