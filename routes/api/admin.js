const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const Admin = require('../../models/Admin');

const router = express.Router();

// @route   GET api/admin/create
// @desc    Create the admin
// @access  Private
router.post('/create', async (req, res) => {
  try {
    let admin = await Admin.find();

    if (admin.length < 1) {
      admin = new Admin({
        email: config.get('ADMIN_EMAIL'),
        password: config.get('ADMIN_PASS')
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(config.get('ADMIN_PASS'), salt);
      admin.save();
    } else {
      res.status(500).send('Cannot Create Admin');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
