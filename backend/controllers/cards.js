const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const deleteCard = (req, res, next) => {
  const currentUser = req.user._id;

  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
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
    .then((card) => res.send({ data: card }))
    .catch(() => next(new ValidationError()));
};

const likeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then(() => {
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
        .then((card) => res.send(card))
        .catch(() => next(new ValidationError()));
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then(() => {
      Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
        .then((card) => res.send(card))
        .catch(() => next(new ValidationError()));
    })
    .catch(next);
};

module.exports = {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
};
