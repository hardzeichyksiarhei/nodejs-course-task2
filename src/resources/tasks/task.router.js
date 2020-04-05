const router = require('express').Router();
const TaskService = require('./task.service');

router.route('/:boardId/tasks').get([TaskService.getByBoardId]);

router
  .route('/:boardId/tasks/:taskId')
  .get([TaskService.getByBoardIdAndTaskId]);

router.route('/:boardId/tasks').post([TaskService.create]);

router.route('/:boardId/tasks/:taskId').put([TaskService.update]);

router.route('/:boardId/tasks/:taskId').delete([TaskService.delete]);

module.exports = router;
