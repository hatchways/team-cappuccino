const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');

aws.config({
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
    accessKeyId: keys.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});

const s3 = new aws.s3();


// image type setup
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPEG or PNG is allowed!'), false);
    }
}


// image uploading
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
