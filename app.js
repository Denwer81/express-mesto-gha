const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use('/', userRouter);

// app.get('/users', (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((err) => {
//       res.status(500).send({ message: 'Произошла ошибка' });
//       console.log(err);
//       // console.log(err.name);
//       // console.log(err.message);
//       // console.log(err.errors);
//     });
// });

// app.get('/users/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       res.status(500).send({ message: 'Произошла ошибка' });
//       console.log(err);
//       // console.log(err.name);
//       // console.log(err.message);
//       // console.log(err.errors);
//     });
// });

// app.post('/users', (req, res) => {
//   const { name, about, avatar } = req.body;

//   User.create({ name, about, avatar })
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       res.status(500).send({ message: 'Произошла ошибка' });
//       console.log(err);
//       // console.log(err.name);
//       // console.log(err.message);
//       // console.log(err.errors);
//     });
// });

app.listen(PORT);
