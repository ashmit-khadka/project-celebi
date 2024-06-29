const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  action: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

const Notification = mongoose.model('notifications', NotificationSchema);

module.exports = Notification;