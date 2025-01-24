const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  MessageBtw_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  Content: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      Message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date, // Timestamp for the message
        default: Date.now,
      },
    },
  ],
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
