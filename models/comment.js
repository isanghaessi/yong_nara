const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				content: {
					type: Sequelize.TEXT,
					allowNull: true,
					unique: false
				}
			},
			{
				sequelize,
				timestamps: false,
				underscored: true,
				modelName: 'Comment',
				tableName: 'comments',
				paranoid: false,
				charset: 'utf8mb4',
				collate: 'utf8mb4_general_ci'
			}
		);
	}

	static associate(db) {
		db.Comment.belongsTo(db.Post, {
			foreignKey: 'post',
			targetKey: 'id'
		});
		db.Comment.belongsTo(db.User, {
			foreignKey: 'commenter',
			targetKey: 'id'
		});
	}
};
