// const AuthError = require('../errors/AuthErrors');
const BadRequestErrors = require('../errors/BadRequestErrors');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerErrors');
const SignUpError = require('../errors/SignUpErrors');
const AuthError = require('../errors/AuthErrors');

const setError = (err, _, res, next) => {
  console.log(err);
  console.log(err.name);
  console.log(err.code);
  console.log(err.message);

  if (err.code === 11000) {
    res
      .status(409)
      .send({
        message: 'Пользователь с таким Email существует',
      });

    return;
  }
  if (err.message === 'Validation failed' || err.name === 'CastError') {
    // next(new BadRequestErrors());
    res
      .status(400)
      .send({
        message: 'Переданы некорректные данные',
      });

    return;
  }

  // if (err.name === 'CastError' || err.name === 'ValidationError' || err.message === 'Validation failed') {
  //   throw new BadRequestErrors(err.message.message);
  // }
  // if (err.code === 11000) {
  //   throw new SignUpError(err.message.message);
  // }
  // if (err.name === 'NotFound') {
  //   throw new NotFoundError(err.message.message);
  // }
  // if (err.code === 401) {
  //   throw new AuthError(err.message.message);
  // }
  // if (!err.name && !err.name && !err.status) {
  //   throw new ServerError(err.message.message);
  // }

  res.status(err.code).send(err.message);

  next();
};

// const handleError = (err, _, res, next) => {
//   // console.log(err.name);
//   // console.log(err.code);
//   // console.log(err.message);
//   // res.status(err.code).send(err.message);

//   next();
// };

module.exports = {
  setError,
  // handleError,
};
