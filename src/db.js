const mongoose = require('mongoose');

const { DATABASE_URL } = require('./common/config');

const User = require('./resources/users/user.model');
const Task = require('./resources/tasks/task.model');

const connectDb = () => {
  return mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const models = { User, Task };

exports.connectDb = connectDb;

exports.models = models;
