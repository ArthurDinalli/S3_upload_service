const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./src/config/multer");
const file_controller = require("./src/controllers/file_controller");

routes.get("/files", file_controller.get_files);

routes.get("/file", file_controller.get_file);

routes.post(
	"/files",
	multer(multerConfig).single("file"),
	file_controller.upload_file
);

routes.delete("/files/:id", file_controller.delete_file);

module.exports = routes;
