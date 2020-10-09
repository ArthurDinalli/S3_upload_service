const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const MAX_SIZE_FIFTY_MEGABYTES = 50 * 1024 * 1024;

/**
 * Array com todos os tipos de arquivo permitidos
 */
const allowedMimes = [
	"image/jpeg",
	"image/pjpeg",
	"image/png",
	"image/gif",
	"image/bmp",
	"image/x-icon",
	"image/svg+xml",
	"image/targa",
	"image/tiff",
	"image/vnd.ms-photo",
	"video/3gpp2",
	"video/3gpp",
	"video/x-ms-asf",
	"video/x-ms-wm",
	"video/x-ms-wmv",
	"video/x-ms-wmx",
	"video/x-ms-wvx",
	"video/avi",
	"video/mpeg",
	"video/vnd.dlna.mpeg-tts",
	"video/x-m4v",
	"video/quicktime",
	"video/mp4",
	"application/pdf",
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.visio",
	"application/vnd.ms-powerpoint",
	"application/msword",
];

module.exports = {
	storage: multerS3({
		s3: new aws.S3(),
		bucket: process.env.BUCKET_NAME,
		acl: "private",
		key: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);

				const fileName = `${req.body.project_id}/${hash.toString(
					"hex"
				)}-${file.originalname}`;

				cb(null, fileName);
			});
		},
	}),
	limits: {
		fileSize: MAX_SIZE_FIFTY_MEGABYTES,
	},
	fileFilter: (req, file, cb) => {
		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("Invalid file type."));
		}
	},
};
