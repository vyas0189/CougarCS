const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const fs = require('fs');
const { promisify } = require('util');
const { s3 } = require('../../config/aws');
const { upload } = require('../uploads/profileImage');
require('../../config/aws');

const unlinkAsync = promisify(fs.unlink);
const Member = require('../../models/Member');
const Officer = require('../../models/Officer');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const router = express.Router();

// @route   GET api/members
// @desc    Get all members
// @access  Public
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.send(members);
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

    const params = {
      Bucket: config.get('AWS_BUCKET_NAME'),
      Key: member.profileImage
    };
    // await s3.getObject(params, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     const imageData = data.Body;
    //     res.json({ member, imageData });
    //   }
    // });
    req.json(member);
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
      const profileImageData = {
        profileImage: 'assets/users-01.png',
        profileImageKey: 'assets/users-01.png'
      };
      member = new Member({
        firstName,
        lastName,
        email,
        password,
        isOfficer: false,
        profileImageData
      });
      console.log(member);

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
      if (req.file.key !== 'assets/users-01.png') {
        s3.deleteObject(
          {
            Bucket: config.get('AWS_BUCKET_NAME'),
            Key: req.file.key
          },
          (err, _) => {
            if (err) res.send({ err });
          }
        );
      }
      return res.status(400).json({ msg: errors.array() });
    }

    const { firstName, lastName, email } = req.body;
    // console.log(req.file);

    try {
      const memberDetails = {
        firstName,
        lastName,
        email,
        profileImageData: {
          profileImage: req.file.location,
          profileImageKey: req.file.key
        }
      };
      const member = await Member.findById(req.params.member_id);

      if (member) {
        if (member.profileImage !== 'assets/users-01.png') {
          s3.deleteObject(
            {
              Bucket: config.get('AWS_BUCKET_NAME'),
              Key: member.profileImageData[0].profileImageKey
            },
            (err, _) => {
              if (err) res.send({ err });
            }
          );
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
        if (req.file.key !== 'assets/users-01.png') {
          s3.deleteObject(
            {
              Bucket: config.get('AWS_BUCKET_NAME'),
              Key: req.file.key
            },
            (err, _) => {
              if (err) res.send({ err });
            }
          );
        }
        return res.status(400).json({ errors: [{ msg: 'Error updating' }] });
      }
    } catch (err) {
      if (req.file.key !== 'assets/users-01.png') {
        s3.deleteObject(
          {
            Bucket: config.get('AWS_BUCKET_NAME'),
            Key: req.file.key
          },
          (err, _) => {
            if (err) res.send({ err });
          }
        );
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   DELETE api/:member_id
// @desc    Delete an members
// @access  Private
router.delete('/:member_id', admin, async (req, res) => {
  try {
    const member = await Member.findById(req.params.member_id);
    if (member) {
      if (member.isOfficer) {
        const officer = await Officer.findOne({ officerMember: member.id });

        if (officer) {
          await Officer.findByIdAndDelete(officer.id, err => {
            if (err) return res.status(500).send(err);
          });
          await Member.findByIdAndDelete(
            req.params.member_id,
            async (err, obj) => {
              if (err) return res.status(500).send(err);
              if (member.profileImage !== 'assets/users-01.png') {
                s3.deleteObject(
                  {
                    Bucket: config.get('AWS_BUCKET_NAME'),
                    Key: member.profileImage
                  },
                  (err, _) => {
                    if (err) res.send({ err });
                  }
                );
              }
              res.json(obj);
            }
          );
        }
      } else {
        await Member.findByIdAndDelete(
          req.params.member_id,
          async (err, obj) => {
            if (err) return res.status(500).send(err);
            if (member.profileImage !== 'assets/users-01.png') {
              s3.deleteObject(
                {
                  Bucket: config.get('AWS_BUCKET_NAME'),
                  Key: member.profileImage
                },
                (err, _) => {
                  if (err) res.send({ err });
                }
              );
            }
            res.json(obj);
          }
        );
      }
    } else {
      return res.status(400).json({ msg: 'User not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
