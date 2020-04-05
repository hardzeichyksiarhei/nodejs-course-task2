const path = require('path');
const { destroyByBoardId } = require('../tasks/task.memory.repository');

let boardsData = require(path.resolve(__dirname, '../../data/boards.js'));

const getAll = async () => {
  return boardsData;
};

const getByID = async id => {
  return boardsData.find(board => board.id === id);
};

const create = async data => {
  boardsData.push(data);
  return data;
};

const update = async (id, data) => {
  let newBoard = {};

  boardsData = boardsData.map(board => {
    if (board.id === id) {
      newBoard = {
        ...board,
        ...data
      };

      board = newBoard;
    }
    return board;
  });

  return newBoard;
};

const destroy = async boardId => {
  let flag = false;
  boardsData = boardsData.filter(border => {
    if (border.id !== boardId) return true;

    destroyByBoardId(boardId);
    flag = true;
    return false;
  });
  return flag;
};

module.exports = { getAll, getByID, create, update, destroy };
