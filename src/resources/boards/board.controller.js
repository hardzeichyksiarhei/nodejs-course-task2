const Board = require('./board.model.js');

exports.create = (req, res) => {
  Board.create(req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.getAll = (req, res) => {
  Board.getAll().then(result => {
    res.status(200).json(result);
  });
};

exports.getByID = (req, res) => {
  Board.getByID(req.params.id).then(result => {
    if (result) res.status(200).json(result);
    else res.status(404).json({});
  });
};

exports.update = (req, res) => {
  Board.update(req.params.id, req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.delete = (req, res) => {
  Board.delete(req.params.id).then(result => {
    res.status(200).json(result);
  });
};
