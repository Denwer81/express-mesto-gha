const Card = require('../models/card');

const getCards = (_, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' });
      console.log(err);
      // console.log(err.name);
      // console.log(err.message);
      // console.log(err.errors);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
