const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .collection('contacts')
      .find();

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);

  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

  } catch (err) {
    res.status(500).json(err);
  }
};

const createContact = async (req, res) => {
  try {

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({
        id: response.insertedId
      });
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

const updateContact = async (req, res) => {

  try {

    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .replaceOne(
        { _id: contactId },
        contact
      );

    if (response.modifiedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteContact = async (req, res) => {

  try {

    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .deleteOne({
        _id: contactId
      });

    if (response.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};