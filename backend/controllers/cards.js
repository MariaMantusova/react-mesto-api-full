const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');
const { checkNotFoundError } = require('../utils/errorChecking');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const deleteCard = (req, res, next) => {
  const currentUser = req.user._id;

  Card.findById(req.params.cardId)
    .then((card) => {
      checkNotFoundError(card);
      if (currentUser !== card.owner.toString()) {
        throw new ForbiddenError();
      }
      return card;
    })
    .then(() => Card.findByIdAndRemove(req.params.cardId, { new: true }))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      checkNotFoundError(card);
      return res.send({ data: card });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkNotFoundError(card);
      return res.send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      checkNotFoundError(card);
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
};
