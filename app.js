const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { setError } = require('./middlewares/errors');
const mainRouter = require('./routes/mainRouter');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(helmet());

app.use(mainRouter);

app.use(errors());
app.use(setError);

app.listen(PORT);
