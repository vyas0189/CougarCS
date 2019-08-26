const aws = require('aws-sdk');
const config = require('config');

aws.config.update({
  secretAccessKey: config.get('AWS_ACCESS_SECRET'),
  accessKeyId: config.get('AWS_ACCESS_KEY'),
  region: config.get('AWS_REGION')
});
const s3 = new aws.S3();

module.exports = { s3 };
