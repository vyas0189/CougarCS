const mongoose = require('mongoose');

const OfficerSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'member'
  },
  position: {
    type: String,
    required: true
  },
  isCurrent: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('officer', OfficerSchema);
