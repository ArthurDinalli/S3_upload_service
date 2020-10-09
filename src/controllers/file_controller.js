const File = require("../models").File;

exports.get_file = async function (req, res) {};

exports.delete_file = async function (req, res) {
	const file = await File.findById(req.params.id);

	await file.remove();

	return res.send();
};

exports.upload_file = async function (req, res) {
	const fileInfo = {
		id: req.file.key,
		project_id: req.body.project_id,
		added_by: req.auth_user.id,
		added_at: Date.now(),
		category_id: req.body.category_id,
		filename: req.file.originalname,
	};

	const file = await File.create(fileInfo);

	return res.json(req.file);
};

exports.get_files = async function (req, res) {
	const files = await File.find();

	return res.json(files);
};
