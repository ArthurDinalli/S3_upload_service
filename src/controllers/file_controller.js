const File = require("../models").File;

exports.get_file = async function (req, res) {};

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
	const files = await File.findAll({
		attributes: ["id", "filename", "category_id"],
		where: {
			project_id: req.params.project_id,
			deleted_by: null,
		},
	});

	return res.json(files);
};
