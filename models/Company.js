const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    require: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  companyImageData: {
    companyImage: {
      type: String,
      required: true
    },
    companyImageKey: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('company', CompanySchema);
