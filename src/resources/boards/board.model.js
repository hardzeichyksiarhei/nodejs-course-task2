const {
  getAll,
  getByID,
  create,
  update,
  destroy
} = require('./board.memory.repository');

class Board {
  constructor() {}

  static async getAll() {
    const boards = await getAll();
    return boards;
  }

  static async getByID(id) {
    const board = await getByID(id);
    return board;
  }

  static async create(data) {
    const board = await create(data);
    return board;
  }

  static async update(id, data) {
    const board = await update(id, data);
    return board;
  }

  static async delete(id) {
    const status = await destroy(id);
    return status;
  }
}
module.exports = Board;
