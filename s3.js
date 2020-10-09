var aws = require('aws-sdk')

const s3 = new aws.S3();
s3.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-2'
});

module.exports = s3;