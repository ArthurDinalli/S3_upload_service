module.exports = (sequelize, DataTypes) => {
	const File = sequelize.define("File", {
		fileID: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		fileName: DataTypes.STRING,
		upUserID: DataTypes.STRING,
		downUserID: DataTypes.STRING,
		url: DataTypes.STRING,
		isDeleted: DataTypes.BOOLEAN,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
	});

	return File;
};
