const File = require("../models").File;
const S3 = require("../../s3");

exports.get_file = async function (req, res) {
	file = await File.findByPk(req.params.id);

	if (!file) {
		return res
			.status(404)
			.json(`Arquivo "${req.params.id}" não existe!`);
	} else if (file.deleted_at && file.deleted_by) {
		return res
			.status(404)
			.json(`Arquivo "${req.params.id}" deletado!`);
	}

	var params = {
		Bucket: process.env.BUCKET_NAME,
		Key: file.id.replace("-", "/"), //para acessar o diretório no S3 é necessário trocar o '-' para uma '/'
		Expires: process.env.PRESIGNED_URL_EXPIRATION_TIME_IN_SECONDS,
	};

	S3.getSignedUrl("getObject", params, function (err, signed_url) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.json(signed_url);
	});
};

exports.delete_file = async function (req, res) {
	await File.update(
		{
			deleted_by: req.auth_user.id,
			deleted_at: Date.now(),
		},
		{
			where: {
				id: req.params.id,
			},
		}
	);

	return res.send();
};

exports.upload_file = async function (req, res) {
	const fileInfo = {
		id: req.file.key.replace("/", "-"), //A '/' necessária para alcançar o diretório no S3 conflita com URL's
		project_id: req.body.project_id,
		added_by: req.auth_user.id,
		added_at: Date.now(),
		category_id: req.body.category_id,
		filename: req.file.originalname,
		file_type: req.file.mimetype,
	};

	const file = await File.create(fileInfo);

	return res.json(fileInfo.id);
};

exports.get_files = async function (req, res) {
	if (!isNaN(Number(req.params.project_id))) {
		const files = await File.findAll({
			attributes: ["id", "filename", "category_id", "file_type"],
			where: {
				project_id: req.params.project_id,
				deleted_by: null,
			},
		});

		return res.json(files);
	} else {
		return res.status(404).json(`Id do projeto inválido!`);
	}
};
