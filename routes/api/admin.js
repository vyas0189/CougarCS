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
        email: req.body.email,
        password: req.body.password
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
      admin.save();
      res.json({ msg: 'Admin created!' });
    } else {
      res.send('Cannot create Admin');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/update
// @desc    Create the admin
// @access  Private
router.put('/update', async (req, res) => {
  try {
    let admin = await Admin.find();

    if (admin.length < 1) {
      admin = new Admin({
        email: req.body.email,
        password: req.body.password
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(process.env.ADMIN_PASS, salt);
      admin.save();
    } else {
      res.send('Cannot create Admin');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
