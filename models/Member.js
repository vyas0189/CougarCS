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
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  resume: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  roleData: [
    {
      isOfficer: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      typeOfRole: {
        type: String,
        required: true,
        default: 'member'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('member', MemberSchema);
