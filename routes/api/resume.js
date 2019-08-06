const express = require('express');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const { s3 } = require('../../config/aws');
const auth = require('../../middleware/auth');
const Member = require('../../models/Member');
const { upload } = require('../uploads/resume');

const router = express.Router();

// @route   PUT api/resume
// @desc    Create the admin
// @access  Private
router.put(
  '/',
  auth,
  check('resume', 'Resume is required'),
  upload.single('resume'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      s3.deleteObject(
        {
          Bucket: config.get('AWS_BUCKET_NAME'),
          Key: req.file.key
        },
        err => {
          if (err) res.send({ err });
        }
      );

      return res.status(400).json({ msg: errors.array() });
    }
    const member = await Member.findById(req.member.id).populate('-password');
    try {
      if (member) {
        if (member.resumeData.resumeKey != null) {
          s3.deleteObject(
            {
              Bucket: config.get('AWS_BUCKET_NAME'),
              Key: member.resumeData.resumeKey
            },
            err => {
              if (err) return res.send({ err });
            }
          );
        }
        await Member.findByIdAndUpdate(
          member.id,
          {
            resumeData: {
              resumeLink: req.file.location,
              resumeKey: req.file.key
            }
          },
          err1 => {
            if (err1) return res.status(500).send(err1);
            res.json({ msg: 'Success' });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
