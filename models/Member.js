const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
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
