const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  adminInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'member'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('admin', AdminSchema);
