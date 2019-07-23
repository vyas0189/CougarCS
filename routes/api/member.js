const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const fs = require('fs');
const { promisify } = require('util');
const multer = require('multer');

const unlinkAsync = promisify(fs.unlink);
const Member = require('../../models/Member');
// const Officer = require('../../models/Officer');
const auth = require('../../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.file);

    cb(null, './images/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

// @route   GET api/members
// @desc    Get all members
// @access  Public
router.get('/', async (req, res) => {
  try {
    // console.log(__dirname);

    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/:member_id
// @desc    Get an members
// @access  Public
router.get('/:member_id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.member_id);
    if (!member) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.json(member);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/member
// @desc    Register a member
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    try {
      let member = await Member.findOne({ email });
      if (member) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      member = new Member({
        firstName,
        lastName,
        email,
        password,
        isOfficer: false,
        profileImage: 'assets/users-01.png'
      });
      const salt = await bcrypt.genSalt(10);
      member.password = await bcrypt.hash(password, salt);
      await member.save();
      const payload = {
        member: {
          id: member.id
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
      res.status(500).send('Server Error');
    }
  }
);
// @route   PUT api/:member_id
// @desc    Update an members
// @access  Public
router.put(
  '/:member_id',
  auth,
  upload.single('profileImage'),
  [
    check('firstName', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file.path !== 'assets/users-01.png') {
        await unlinkAsync(req.file.path);
      }
      return res.status(400).json({ msg: errors.array() });
    }

    const { firstName, lastName, email } = req.body;

    const memberDetails = {
      firstName,
      lastName,
      email,
      profileImage: req.file.path
    };
    console.log(memberDetails.profileImage);

    try {
      const member = await Member.findById(req.params.member_id);

      if (member) {
        if (member.profileImage !== 'assets/users-01.png') {
          await unlinkAsync(req.file.path);
        }
        await Member.findByIdAndUpdate(
          req.params.member_id,
          memberDetails,
          (err, obj) => {
            if (err) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Error updating' }] });
            }
            res.json(obj);
          }
        );
      } else {
        if (req.file.path !== 'assets/users-01.png') {
          await unlinkAsync(req.file.path);
        }
        return res.status(400).json({ errors: [{ msg: 'Error updating' }] });
      }
    } catch (err) {
      if (req.file.path !== 'assets/users-01.png') {
        await unlinkAsync(req.file.path);
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   DELETE api/:member_id
// @desc    Delete an members
// @access  Public

module.exports = router;
