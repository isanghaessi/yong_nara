document.getElementById('btn_join').addEventListener('click', () => {
	window.location.href = '/join';
});

document.getElementById('btn_find').addEventListener('click', async () => {
	mail = window.prompt('input your e-mail');
	const reg_mail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	if (reg_mail.test(mail)) {
		await axios
			.post('/send_mail', {
				mail
			})
			.then((data) => {
				const num = data.data.result.length;
				const success = data.data.result.reduce((acc, cur) => {
					if (cur) {
						acc += 1;
					}
					return acc;
				}, 0);
				window.alert(
					`there is/are ${num} of id found!\n${success} of pw resetted!\nand sent to you pw via email.`
				);
			})
			.catch((error) => {
				console.error(error);
			});
	} else {
		window.alert('you must input e-mail form!');
	}
});
