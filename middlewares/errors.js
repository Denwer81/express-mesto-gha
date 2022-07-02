// const AuthError = require('../errors/AuthErrors');
const setError = (err, _, res, next) => {
  // console.log(err);
  // console.log(err.name);
  // console.log(err.code);
  // console.log(err.message);

  if (err.code === 11000) {
    res
      .status(409)
      .send({
        message: 'Пользователь с таким Email существует',
      });

    return;
  }
  if (err.message === 'Validation failed' || err.name === 'CastError' || err.name === 'ValidationError') {
    res
      .status(400)
      .send({
        message: 'Переданы некорректные данные',
      });

    return;
  }

  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
};

module.exports = {
  setError,
};
