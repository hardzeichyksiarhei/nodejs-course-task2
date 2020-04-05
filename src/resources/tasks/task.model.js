const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  boardId: {
    type: String
  },
  columnId: {
    type: String
  }
});

taskSchema.virtual('id').get(() => {
  return this._id.toHexString();
});

taskSchema.set('toJSON', {
  virtuals: true
});

taskSchema.statics.findByBoardId = (boardId, cb) => {
  return this.find({ boardId }, cb);
};

taskSchema.statics.findOneByBoardIdAndTaskId = (boardId, taskId, cb) => {
  return this.findOne({ boardId, _id: taskId }, cb);
};

taskSchema.methods.toResponse = () => {
  const { id, title, description, order, userId, boardId, columnId } = this;
  return { id, title, description, order, userId, boardId, columnId };
};

const Task = model('Tasks', taskSchema);

exports.getByBoardId = boardId => {
  return Task.findByBoardId(boardId).then(result => {
    return result.map(task => task.toResponse());
  });
};

exports.getByBoardIdAndTaskId = (boardId, taskId) => {
  return Task.findOneByBoardIdAndTaskId(boardId, taskId).then(result => {
    return result && result.toResponse();
  });
};

exports.create = taskData => {
  const task = new Task(taskData);
  return task.save().then(t => {
    return t.toResponse();
  });
};

exports.update = (boardId, taskId, taskData) => {
  return new Promise((resolve, reject) => {
    Task.findOneByBoardIdAndTaskId(boardId, taskId, (err, task) => {
      if (err) reject(err);
      for (const i in taskData) {
        if (Object.prototype.hasOwnProperty.call(taskData, i)) {
          task[i] = taskData[i];
        }
      }
      task.save((e, updatedTask) => {
        if (e) return reject(e);
        resolve(updatedTask.toResponse());
      });
    });
  });
};

exports.delete = (boardId, taskId) => {
  return new Promise((resolve, reject) => {
    Task.deleteOne({ _id: taskId, boardId }, (err, res) => {
      if (err) reject(err);
      else resolve(res.deletedCount);
    });
  });
};

module.exports.Task = Task;
