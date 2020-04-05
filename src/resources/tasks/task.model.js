const {
  getByBoardId,
  getByBoardIdAndTaskId,
  create,
  update,
  destroy
} = require('./task.memory.repository');

class Task {
  constructor() {}

  static async getByBoardId(boardId) {
    const tasks = await getByBoardId(boardId);
    return tasks;
  }

  static async getByBoardIdAndTaskId(boardId, taskId) {
    const task = await getByBoardIdAndTaskId(boardId, taskId);
    return task;
  }

  static async create(data) {
    const task = await create(data);
    return task;
  }

  static async update(boardId, taskId, data) {
    const task = await update(boardId, taskId, data);
    return task;
  }

  static async delete(boardId, taskId) {
    const status = await destroy(boardId, taskId);
    return status;
  }
}
module.exports = Task;
