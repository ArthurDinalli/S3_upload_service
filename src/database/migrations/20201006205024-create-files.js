module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Files", {
			fileID: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
			fileName: {
				type: Sequelize.STRING,
			},
			upUserID: {
				type: Sequelize.STRING,
			},
			downUserID: {
				type: Sequelize.STRING,
			},

			url: {
				type: Sequelize.STRING,
			},
			isDeleted: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Files");
	},
};
