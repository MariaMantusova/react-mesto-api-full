const throwError = (req, res) => res.status(404).send({ message: 'NotFoungError' });

module.exports = { throwError };
