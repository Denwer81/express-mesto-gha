const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { setError, handleError } = require('./midlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();

// const errorHandler = (err, _, res, next) => {
//   console.log(err);

//   // if (err.name === 'CastError' || err.name === 'ValidationError') {
//   //   next(BadRequestErrors());
//   // } if (err.code === 11000) {
//   //   next(SingUpError());
//   // } else {
//   //   next(ServerError());
//   // }

//   res.status(err.code).send(err.message);

//   next();

//   // res.status(err.code).send(err.message);

//   // next();
// };

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req, _, next) => {
  req.user = { _id: '62b16aae5bfe40bf59ae391e' };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((_, __, next) => next(new NotFoundError('Путь не найден')));
app.use(errors);
app.use(setError);
app.use(handleError);

app.listen(PORT);
