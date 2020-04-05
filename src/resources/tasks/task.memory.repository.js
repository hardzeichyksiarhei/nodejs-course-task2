const path = require('path');

let tasksData = require(path.resolve(__dirname, '../../data/tasks.js'));

const getByBoardId = async boardId => {
  return tasksData.filter(task => task.boardId === boardId);
};

const getByBoardIdAndTaskId = async (boardId, taskId) => {
  return tasksData.find(task => task.boardId === boardId && task.id === taskId);
};

const create = async data => {
  const newData = {
    ...data,
    userId: data.userId || null,
    columnId: data.columnId || null
  };
  tasksData = tasksData.concat(newData);
  return newData;
};

const update = async (boardId, taskId, data) => {
  let newTask = {};
  tasksData = tasksData.map(task => {
    if (task.boardId === boardId && task.id === taskId) {
      newTask = {
        ...task,
        ...data
      };

      task = newTask;
    }
    return task;
  });
  return newTask;
};

const userIdSetNull = async userId => {
  tasksData = tasksData.map(task => {
    if (task.userId === userId) {
      return {
        ...task,
        userId: null
      };
    }
    return task;
  });
};

const destroy = async (boardId, taskId) => {
  let flag = false;
  tasksData = tasksData.filter(task => {
    if (task.boardId === boardId && task.id === taskId) return false;

    flag = true;
    return true;
  });
  return flag;
};

const destroyByBoardId = async boardId => {
  let flag = false;
  tasksData = tasksData.filter(task => {
    if (task.boardId !== boardId) return true;

    flag = true;
    return false;
  });
  return flag;
};

module.exports = {
  getByBoardId,
  getByBoardIdAndTaskId,
  create,
  update,
  userIdSetNull,
  destroy,
  destroyByBoardId
};
