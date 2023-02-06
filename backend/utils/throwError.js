const throwEror = (req, res) => res.status(404).send({ message: 'NotFoungError' });

module.exports = { throwEror };
