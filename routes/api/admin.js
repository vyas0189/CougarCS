const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
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

// @route   GET api/admin/login
// @desc    Login the admin
// @access  Private
router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // See if member exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // Return jsonwebtoken
      const payload = {
        admin: {
          id: admin.id
        }
      };

      jwt.sign(
        payload,
        config.get('JWT_SECRET'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
