const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				content: {
					type: Sequelize.TEXT,
					allowNull: true,
					unique: false
				},
				price: {
					type: Sequelize.INTEGER,
					allowNull: false,
					unique: false
				},
				is_selling: {
					type: Sequelize.BOOLEAN,
					allowNUll: false,
					unique: false
				}
			},
			{
				sequelize,
				timestamps: false,
				underscored: true,
				modelName: 'Post',
				tableName: 'posts',
				paranoid: false,
				charset: 'utf8mb4',
				collate: 'utf8mb4_general_ci'
			}
		);
	}

	static associate(db) {
		db.Post.belongsTo(db.User, { foreignKey: 'poster', targetKey: 'id' });
		db.Post.hasMany(db.Comment, { foreignKey: 'post', targetKey: 'id' });
	}
};
