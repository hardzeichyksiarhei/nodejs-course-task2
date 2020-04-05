const {
  getAll,
  getByID,
  create,
  update,
  destroy
} = require('./user.memory.repository');

class User {
  constructor() {}

  static async getAll() {
    const users = await getAll();
    return users.map(User.toResponse);
  }

  static async getByID(id) {
    const user = await getByID(id);
    return User.toResponse(user);
  }

  static async create(data) {
    const user = await create(data);
    return User.toResponse(user);
  }

  static async update(id, data) {
    const user = await update(id, data);
    return User.toResponse(user);
  }

  static async delete(id) {
    const status = await destroy(id);
    return status;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
module.exports = User;
