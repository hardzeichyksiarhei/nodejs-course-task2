const router = require('express').Router();
const TaskController = require('./task.controller');

router.route('/:boardId/tasks').get([TaskController.getByBoardId]);

router
  .route('/:boardId/tasks/:taskId')
  .get([TaskController.getByBoardIdAndTaskId]);

router.route('/:boardId/tasks').post([TaskController.create]);

router.route('/:boardId/tasks/:taskId').put([TaskController.update]);

router.route('/:boardId/tasks/:taskId').delete([TaskController.delete]);

module.exports = router;
