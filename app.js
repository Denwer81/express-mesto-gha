const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const { signUpValidtion } = require('./validation/JoiValidation');
const { setError, handleError } = require('./middlewares/errors');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req, _, next) => {
  req.user = { _id: '62b16aae5bfe40bf59ae391e' };

  next();
});

app.post('/signin', login);
app.post('/signup', celebrate(signUpValidtion), createUser);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((_, __, next) => next(new NotFoundError('Путь не найден')));
app.use(errors);
app.use(setError);
app.use(handleError);

app.listen(PORT);
