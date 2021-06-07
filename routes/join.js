var express = require('express');
var router = express.Router();
const { Op } = require('sequelize');
const models = require('../models');
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
	res.render('join');
});

router.get('/check_dup', async (req, res, next) => {
	let result = false;
	await models.User.findAll({
		where: {
			ID: req.query.id
		}
	})
		.then((users) => {
			if (users.length > 0) {
				result = true;
			} else {
				result = false;
			}
		})
		.catch((error) => {
			console.log(error);
		});
	res.send(result);
});

router.post('/add', async (req, res, next) => {
	let is_success = true;
	const id = req.body.id;
	const pw = req.body.pw;
	const name = req.body.name;
	const mail = req.body.mail;
	if (id && pw && name && mail) {
		try {
			const hash = await bcrypt.hash(pw, 12);
			await models.User.create({
				ID: id,
				PW: hash,
				name,
				mail
			});
		} catch (error) {
			console.error(error);
			is_success = false;
		}
	} else {
		console.error(
			"join.js / post('/add') -> id, pw, name, mail not coming..."
		);
		is_susccess = false;
	}
	res.json({ is_success });
});

module.exports = router;
