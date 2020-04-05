const { Schema, model } = require('mongoose');
const { Task } = require('../tasks/task.model');

const columnSchema = new Schema({
  title: {
    type: String
  },
  order: {
    type: Number
  }
});

columnSchema.virtual('id').get(() => {
  return this._id.toHexString();
});

columnSchema.set('toJSON', {
  virtuals: true
});

columnSchema.methods.toResponse = () => {
  const { id, title, order } = this;
  return { id, title, order };
};

model('Columns', columnSchema);

const boardSchema = new Schema({
  title: {
    type: String
  },
  columns: [columnSchema]
});

boardSchema.post('findOneAndDelete', async board => {
  if (!board) return;
  await Task.deleteMany({ boardId: board._id.toHexString() });
});

boardSchema.virtual('id').get(() => {
  return this._id.toHexString();
});

boardSchema.set('toJSON', {
  virtuals: true
});

boardSchema.findById = cb => {
  return this.model('Boards').find({ id: this.id }, cb);
};

boardSchema.methods.toResponse = () => {
  const { id, title, columns } = this;
  return { id, title, columns: columns.map(column => column.toResponse()) };
};

const Board = model('Boards', boardSchema);

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Board.find().exec((err, boards) => {
      if (err) reject(err);
      else resolve(boards.map(board => board.toResponse()));
    });
  });
};

exports.getByID = boardId => {
  return Board.findById(boardId).then(result => {
    return result && result.toResponse();
  });
};

exports.create = boardData => {
  const board = new Board(boardData);
  return board.save().then(b => {
    return b.toResponse();
  });
};

exports.update = (boardId, boardData) => {
  return new Promise((resolve, reject) => {
    Board.findById(boardId, (err, board) => {
      if (err) reject(err);
      for (const i in boardData) {
        if (i === 'columns') continue;
        board[i] = boardData[i];
      }
      board.save((e, updatedBoard) => {
        if (e) return reject(e);
        resolve(updatedBoard.toResponse());
      });
    });
  });
};

exports.delete = async boardId => {
  const result = await Board.findOneAndDelete({ _id: boardId });
  return result._id;
};
