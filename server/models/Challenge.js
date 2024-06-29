const mongoose = require('mongoose');
const User = require('./User');

const ChallengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  points: {
    type: Number,
    required: true
  },
});

const Challenge = mongoose.model('Challenges', ChallengeSchema);

module.exports = Challenge;