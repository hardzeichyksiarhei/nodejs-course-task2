const User = require('./user.model');

exports.create = (req, res) => {
  User.create(req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.getAll = (req, res) => {
  User.getAll().then(result => {
    res.status(200).json(result);
  });
};

exports.getById = (req, res) => {
  User.getById(req.params.userId).then(result => {
    res.status(200).json(result);
  });
};

exports.update = (req, res) => {
  User.update(req.params.userId, req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.delete = (req, res) => {
  User.delete(req.params.userId).then(result => {
    res.status(200).json(result);
  });
};
