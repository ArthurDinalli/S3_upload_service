module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define(
		"Category",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
			},
		},
		{
			tableName: "attachments_categories",
			timestamps: false,
		}
	);

	Category.associate = (models) => {
		Category.hasMany(models.File, {
			onDelete: "cascade",
		});
	};

	return Category;
};
