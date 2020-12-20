const { Animal } = require('./../models');

module.exports.createAnimal = async (req, res, next) => {
  const { body } = req;
  const animalInstance = new Animal(body);
  try {
    const createdAnimal = await animalInstance.save();
    if (createdAnimal) {
      return res.status(201).send({ data: createdAnimal });
    }
    res.status(400).send('Bad request');
  } catch (err) {
    next(err);
  }
};

module.exports.getAllAnimals = async (req, res, next) => {
  try {
    const foundAnimals = await Animal.find();
    console.log(foundAnimals);
    if (foundAnimals) {
      return res.status(200).send({ data: foundAnimals });
    }
    res.status(404).send('Animals not found');
  } catch (e) {
    next(e);
  }
};

module.exports.getAnimal = async (req, res, next) => {
  const {
    params: { animalId },
  } = req;

  try {
    const foundAnimal = await Animal.findById(animalId);
    if (foundAnimal) {
      return res.status(200).send({ data: foundAnimal });
    }
    res.status(404).send('Animal not found');
  } catch (e) {
    next(e);
  }
};

module.exports.updateAnimal = async (req, res, next) => {
  const {
    body,
    params: { animalId },
  } = req;
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, body, {
      new: true,
    });
    if (updatedAnimal) {
      return res.status(200).send({ data: updatedAnimal });
    }
    res.status(404).send('Animal not found');
  } catch (e) {
    next(e);
  }
};

module.exports.deleteAnimal = async (req, res, next) => {
  const {
    params: { animalId },
  } = req;

  try {
    const deletedAnimal = await Animal.findByIdAndDelete(animalId);
    if (deletedAnimal) {
      return res.status(200).send({ data: deletedAnimal });
    }
    res.status(404).send('Animal not found');
  } catch (e) {
    next(e);
  }
};
