const Task = require('./task.model.js');

exports.create = (req, res) => {
  req.body.boardId = req.params.boardId;

  Task.create(req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.getByBoardId = (req, res) => {
  Task.getByBoardId(req.params.boardId).then(result => {
    res.status(200).json(result);
  });
};

exports.getByBoardIdAndTaskId = (req, res) => {
  if (req.params.boardId === 'undefined' || req.params.taskId === 'undefined') {
    res.sendStatus(404);
    return;
  }

  Task.getByBoardIdAndTaskId(req.params.boardId, req.params.taskId).then(
    result => {
      if (result) res.status(200).json(result);
      else res.status(404).json({});
    }
  );
};

exports.update = (req, res) => {
  Task.update(req.params.boardId, req.params.taskId, req.body).then(result => {
    res.status(200).json(result);
  });
};

exports.delete = (req, res) => {
  Task.delete(req.params.boardId, req.params.taskId).then(result => {
    res.status(200).json(result);
  });
};
