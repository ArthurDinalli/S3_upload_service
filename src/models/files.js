module.exports = (sequelize, DataTypes) => {
	const File = sequelize.define(
		"File",
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			project_id: { type: DataTypes.BIGINT, allowNull: false },
			added_by: { type: DataTypes.BIGINT, allowNull: false },
			added_at: { type: DataTypes.DATE, allowNull: false },
			deleted_by: DataTypes.BIGINT,
			deleted_at: DataTypes.DATE,
			category_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				foreignKey: true,
			},
			filename: { type: DataTypes.STRING, allowNull: false },
			file_type: { type: DataTypes.STRING, allowNull: false },
			file_description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "project_attachements",
			timestamps: false,
		}
	);

	File.associate = (models) => {
		File.belongsTo(models.Category, {
			as: 'category',
			foreignKey: {
				allowNull: false,
				name: "category_id",
			},
		});
	};

	return File;
};
