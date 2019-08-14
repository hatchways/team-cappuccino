const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');

aws.config.update({
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  region: 'us-east-1'
});

const s3 = new aws.S3();

// image type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test( file.mimetype );
  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type!'), false);
  }
}

// upload
const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'team-cappuccino-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;