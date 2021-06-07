const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				ID: {
					type: Sequelize.STRING(20),
					allowNull: false,
					unique: true
				},
				PW: {
					type: Sequelize.TEXT,
					allowNull: false,
					unique: false
				},
				name: {
					type: Sequelize.STRING(20),
					allowNull: false,
					unique: false
				},
				mail: {
					type: Sequelize.STRING(40),
					allowNull: false,
					unique: false
				}
			},
			{
				sequelize,
				timestamps: false,
				underscored: true,
				modelName: 'User',
				tableName: 'users',
				paranoid: false,
				charset: 'utf8',
				collate: 'utf8_general_ci'
			}
		);
	}

	static associate(db) {
		db.User.hasMany(db.Post, { foreignKey: 'poster', targetKey: 'id' });
		db.User.hasMany(db.Comment, {
			foreignKey: 'commenter',
			targetKey: 'id'
		});
	}
};
