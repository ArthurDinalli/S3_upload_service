var aws = require('aws-sdk')

const s3 = new aws.S3();
s3.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	signatureVersion: process.env.AWS_SIGNATURE_VERSION,
	region: process.env.BUCKET_REGION
});

module.exports = s3;