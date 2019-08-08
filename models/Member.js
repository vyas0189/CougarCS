const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: {
    type: String
  },
  profileImageData: {
    profileImage: {
      type: String,
      required: true
    },
    profileImageKey: {
      type: String,
      required: true
    }
  },
  resumeData: {
    resumeLink: {
      type: String
    },
    resumeKey: {
      type: String
    }
  },
  isOfficer: {
    type: Boolean,
    required: true,
    default: false
  },
  isEmployee: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('member', MemberSchema);
