const aws = require('aws-sdk');
// const config = require('config');

aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEYS,
  region: process.env.AWS_REGIONS,
});
const s3 = new aws.S3();

module.exports = { s3 };
