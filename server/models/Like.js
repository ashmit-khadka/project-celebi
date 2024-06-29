const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

const Like = mongoose.model('likes', LikeSchema);

module.exports = Like;