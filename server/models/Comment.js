const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
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

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;