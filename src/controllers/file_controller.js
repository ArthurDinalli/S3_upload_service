const File = require("../models/files");

exports.get_file = async function(req, res) {}

exports.delete_file = async function(req, res) {

	const file = await File.findById(req.params.id);

	await file.remove();

	return res.send();
}

exports.upload_file = async function(req, res) {
	// const {
		// 	originalname: name,
		// 	size,
		// 	key,
		// 	location: url = "",
		// } = req.file;

		// const file = await File.create({
		// 	name,
		// 	size,
		// 	key,
		// 	url,
		// });

		return res.json(req.file);
}

exports.get_files = async function(req, res) {
	const files = await File.find();

	return res.json(files);
}