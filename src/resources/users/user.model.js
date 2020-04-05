const { Schema, model } = require('mongoose');
const { Task } = require('../tasks/task.model');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.post('findOneAndDelete', async user => {
  await Task.updateMany({ userId: user._id.toHexString() }, { userId: null });
});

userSchema.virtual('id').get(() => {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true
});

userSchema.methods.toResponse = () => {
  const { id, name, login } = this;
  return { id, name, login };
};

const User = model('Users', userSchema);

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    User.find().exec((err, users) => {
      if (err) reject(err);
      else resolve(users.map(user => user.toResponse()));
    });
  });
};

exports.getById = id => {
  return User.findById(id).then(result => {
    return result && result.toResponse();
  });
};

exports.create = userData => {
  const user = new User(userData);
  return user.save().then(u => {
    return u.toResponse();
  });
};

exports.update = (userId, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(userId, (err, user) => {
      if (err) reject(err);
      for (const i in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, i)) {
          user[i] = userData[i];
        }
      }
      user.save((e, updatedUser) => {
        if (e) return reject(e);
        resolve(updatedUser.toResponse());
      });
    });
  });
};

exports.delete = async userId => {
  const result = await User.findOneAndDelete({ _id: userId });
  return result._id;
};
