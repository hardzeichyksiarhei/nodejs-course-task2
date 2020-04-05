const User = require('./user.model.js');
const uuid = require('uuid');

exports.create = (req, res) => {
  req.body.id = uuid();

  User.create(req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.getAll = (req, res) => {
  User.getAll().then(result => {
    res.status(200).json(result);
  });
};

exports.getByID = (req, res) => {
  User.getByID(req.params.id).then(result => {
    res.status(200).json(result);
  });
};

exports.update = (req, res) => {
  User.update(req.params.id, req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.delete = (req, res) => {
  User.delete(req.params.id).then(result => {
    res.status(200).json(result);
  });
};
