const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const Officer = require('../../models/Officer');
const Member = require('../../models/Member');

const unlinkAsync = promisify(fs.unlink);
const admin = require('../../middleware/admin');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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

// @route   GET api/officer
// @desc    Get all officers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const officers = await Officer.find().select('-password');
    res.json(officers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/officer/:officer_id
// @desc    Get specific officers
// @access  Private
router.get('/:officer_id', async (req, res) => {
  try {
    const officers = await Officer.findById(req.params.officer_id);
    if (!officers) {
      return res.status(400).json({ msg: 'User not found' });
    }
    const info = await Member.findById(officers.officerMember).select(
      '-password'
    );
    officers.info = info;
    const officerDetails = { officers, info };
    res.json(officerDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/member/officer/:officer_id
// @desc    Edit/Add a officer
// @access  Private
router.put(
  '/:officer_id',
  admin,
  upload.single('profileImage'),
  [
    check('firstName', 'First Name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last Name is required')
      .not()
      .isEmpty(),
    check('position', 'Position is required')
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

    const {
      firstName,
      lastName,
      email,
      position,
      isCurrent,
      isOfficer
    } = req.body;

    const officerModelDetails = {
      officerMember: req.params.officer_id,
      position,
      isCurrent
    };
    const officerMember = {
      isOfficer,
      firstName,
      lastName,
      email,
      profileImageData: {
        profileImage: req.file.location,
        profileImageKey: req.file.key
      }
    };

    try {
      let officer = await Officer.findOne({
        officerMember: req.params.officer_id
      });
      const member = await Member.findById(req.params.officer_id);

      if (officer) {
        if (
          req.file.path !== 'assets/users-01.png' &&
          member.profileImage !== 'assets/users-01.png'
        ) {
          await unlinkAsync(member.profileImage);
        }
        await Officer.findByIdAndUpdate(
          officer.id,
          officerModelDetails,
          async (err1, data) => {
            const MemberData = data;
            if (err1) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Error updating' }] });
            }
            await Member.findByIdAndUpdate(
              req.params.officer_id,
              officerMember,
              (err2, obj) => {
                if (err2) {
                  return res
                    .status(400)
                    .json({ errors: [{ msg: 'Error updating member' }] });
                }
                MemberData.md = obj;
              }
            );
            res.json(MemberData);
          }
        );
      } else if (!officer && isOfficer) {
        if (
          member.profileImage !== 'assets/users-01.png' &&
          require.file.path !== 'assets/users-01.png'
        ) {
          await unlinkAsync(req.file.path);
        }
        officer = new Officer(officerModelDetails);
        await officer.save();

        await Member.findByIdAndUpdate(
          req.params.officer_id,
          officerMember,
          (err, obj) => {
            if (err) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Error updating member' }] });
            }
            res.json(obj);
          }
        );
      } else {
        if (req.file.path !== 'assets/users-01.png') {
          await unlinkAsync(req.file.path);
        }
        res.status(500).send('Officer not found');
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

module.exports = router;
