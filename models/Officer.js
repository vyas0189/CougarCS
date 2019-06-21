const mongoose = require('mongoose');

const OfficerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  image: {
    fileID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'uploadsPic.files'
    },
    fileName: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('officer', OfficerSchema);
