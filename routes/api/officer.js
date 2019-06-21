const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Officer = require('../../models/Officer');
const mongoose = require('mongoose');
const config = require('config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const conn = mongoose.connection;

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploadsPic');
});

const storage = new GridFsStorage({
  url: config.get('MONGO_URI'),
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().toISOString() + file.originalname;
      const fileInfo = {
        filename: fileName,
        bucketName: 'uploadsPic'
      };
      resolve(fileInfo);
    });
  },
  options: { useNewUrlParser: true }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// @route   POST api/officer
// @desc    Add a officer
// @access  Private
router.post(
  '/',
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
      gfs.files.deleteOne({ filename: req.file.filename }, (err, ret) => {
        if (err) console.log(err);
      });
      return res.status(400).json({ msg: errors.array() });
    }
    const { firstName, lastName, email, position } = req.body;
    try {
      let officer = await Officer.findOne({ email });
      if (officer) {
        if (req.file) {
          gfs.files.deleteOne({ filename: req.file.filename }, (err, ret) => {
            if (err) console.log(err);
          });
        }
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      officer = new Officer({
        firstName,
        lastName,
        email,
        position,
        image: { fileID: req.file.id, fileName: req.file.filename }
      });
      await officer.save();
      res.json(officer);
    } catch (err) {
      gfs.files.deleteOne({ filename: req.file.filename }, (err, ret) => {
        if (err) console.log(err);
      });
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/officer/image/:imageID
// @desc    Get all officers
// @access  Public
router.get('/image/:imageName', (req, res) => {
  try {
    const fileUpload = mongoose.connection.db.collection('uploadsPic.files');
    const chuck = mongoose.connection.db.collection('uploadsPic.chunks');
    fileUpload.find({ filename: req.params.imageName }).toArray((err, docs) => {
      console.log(docs);

      chuck
        .find({ files_id: docs[0]._id })
        .sort({ n: 1 })
        .toArray((err, chunks) => {
          console.log(chunks);

          if (err) {
            res.send(err);
          }
          let fileData = [];
          for (let i = 0; i < chunks.length; i++) {
            fileData.push(chunks[i].data.toString('base64'));
          }
          let resData = `data:${docs[0].contentType};base64,${fileData.join(
            ''
          )}`;
          res.send(resData);
        });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   GET api/officer
// @desc    Get all officers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const officers = await Officer.find();
    console.log(officers);

    res.json(officers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/officer/:member_id
// @desc    Get specific officers
// @access  Private
router.get('/:member_id', async (req, res) => {
  try {
    const officers = await Officer.findById(req.params.member_id);
    if (!officers) {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.json(officers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/officer/:member_id
// @desc    Edit a officer
// @access  Private
router.put(
  '/:member_id',
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
      gfs.files.deleteOne({ filename: req.file.filename }, (err, ret) => {
        if (err) console.log(err);
      });
      return res.status(400).json({ msg: errors.array() });
    }

    const { firstName, lastName, email, position } = req.body;
    const newOfficer = {
      firstName,
      lastName,
      email,
      position,
      image: { fileID: req.file.id, fileName: req.file.filename }
    };

    try {
      const officer = await Officer.findById(req.params.member_id);
      if (officer) {
        const checkEmail = await Officer.find({ email });

        if (checkEmail && checkEmail[0]._id != req.params.member_id) {
          gfs.files.deleteOne({ filename: req.file.filename }, (err, ret) => {
            if (err) console.log(err);
          });
          return res.status(400).json({
            errors: [{ msg: 'Email already exits in the database!' }]
          });
        }
        gfs.files.deleteOne({ _id: officer.image.fileID }, (err, ret) => {
          if (err) console.log(err);
        });
        await Officer.findByIdAndUpdate(
          req.params.member_id,
          newMember,
          (err, obj) => {
            if (err) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'Error updating' }] });
            } else {
              res.json(obj);
            }
          }
        );
      } else {
        gfs.files.deleteOne({ filename: req.file.filename }, (err, ret) => {
          if (err) console.log(err);
        });
        return res.status(400).json({ errors: [{ msg: 'Error updating' }] });
      }
    } catch (err) {
      gfs.files.deleteOne({ filename: req.file.filename }, (err, ret) => {
        if (err) console.log(err);
      });
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/officer/:member_id
// @desc    Delete a officer
// @access  Private
router.delete('/:member_id', async (req, res) => {
  try {
    const officer = await Officer.findById(req.params.member_id);
    if (!officer) {
      return res.status(400).json({ msg: 'User not found' });
    }
    await Officer.findByIdAndDelete(req.params.member_id, async (err, obj) => {
      if (err) return res.status(500).send(err);
      gfs.files.deleteOne({ _id: officer.image.fileID }, (err, ret) => {
        if (err) console.log(err);
      });
      res.json(obj);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
