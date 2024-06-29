const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;