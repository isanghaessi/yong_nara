var express = require('express');
var router = express.Router();
const models = require('../models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

router.post('/send_mail', async (req, res, next) => {
	let result = [false];
	mail = req.body.mail;
	if (mail != '') {
		await models.User.findAll({
			where: {
				mail
			}
		})
			.then(async (data) => {
				if (data.length > 0) {
					result = [];
					cnt = 0;
					for (let d of data) {
						let new_pw = Math.random().toString(36).substr(2, 11);
						hash = await bcrypt.hash(new_pw, 12);
						await models.User.update(
							{
								PW: hash
							},
							{
								where: {
									id: d.id
								}
							}
						);
						let transporter = nodemailer.createTransport({
							service: 'gmail',
							auth: {
								user: process.env.NODEMAILER_USER,
								pass: process.env.NODEMAILER_PASS
							}
						});
						await transporter
							.sendMail({
								from: `yongnara ${process.env.NODEMAILER_USER}`,
								to: mail,
								subject: 'yong nara find ID/PW',
								text: `from yong nara,\nyour password resetted\nid: ${d.ID}\npw: ${new_pw}`
							})
							.then(() => {
								result[cnt] = true;
							})
							.catch((error) => {
								console.error(error);
								result[cnt] = false;
							});
						cnt += 1;
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	} else {
		console.error("index.js / post('/send_mail') mail not coming...");
	}
	res.json({ result });
});

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

module.exports = router;
