const path = require('path');
const { userIdSetNull } = require('../tasks/task.memory.repository');

let usersData = require(path.resolve(__dirname, '../../data/users.js'));

const getAll = async () => {
  return usersData;
};

const getByID = async id => {
  return usersData.find(user => user.id === id);
};

const create = async data => {
  usersData.push(data);
  return data;
};

const update = async (id, data) => {
  let newData = {};
  usersData = usersData.map(user => {
    if (user.id === id) {
      newData = { ...user, ...data };
      user = newData;
    }
    return user;
  });

  return newData;
};

const destroy = async id => {
  let flag = false;
  usersData = usersData.filter(user => {
    if (user.id !== id) return true;

    userIdSetNull(id);
    flag = true;
    return false;
  });
  return flag;
};

module.exports = { getAll, getByID, create, update, destroy };
