const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');
const { s3 } = require('../../config/aws');

const fileFilter = (req, file, cb) => {
  if (!file.mimetype === ('pdf' || 'docx' || 'doc')) {
    cb(new Error('File is not supported'), false);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage: multerS3({
    s3,
    bucket: config.get('AWS_BUCKET_NAME'),
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(
        null,
        `resumes/${new Date().toISOString().replace(/:/g, '-')}${
          file.originalname
        }`
      );
    },
    fileFilter
  })
});

module.exports = { upload };
