const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'likes'
  }],
  image: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;