let is_duplicate = null;

document.getElementById('btn_back').addEventListener('click', (event) => {
	window.location.href = '/';
});

document
	.getElementById('btn_check_dup')
	.addEventListener('click', async (event) => {
		event.preventDefault();
		id = document.getElementById('input_id').value;
		await axios
			.get('/join/check_dup', {
				params: {
					id
				}
			})
			.then((data) => {
				is_duplicate = data.data;
			});
		if (is_duplicate) {
			window.alert(`${id} is already exists!\ninput another id.`);
		} else {
			window.alert(`you can use ${id}`);
			is_duplicate = true;
		}
	});

document
	.getElementById('form_join')
	.addEventListener('submit', async (event) => {
		event.preventDefault();
		id = document.getElementById('input_id').value;
		pw = document.getElementById('input_pw').value;
		name = document.getElementById('input_name').value;
		mail = document.getElementById('input_mail').value;
		const reg_mail =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		if (id == '' || pw == '' || name == '' || mail == '') {
			window.alert('you must input all information!');
		} else if (!reg_mail.test(mail)) {
			window.alert('you must input mail address form!');
		} else if (is_duplicate == null) {
			window.alert('you must check duplicate id!');
		} else if (!is_duplicate) {
			window.alert("you must use another id\nthere's duplicate id!");
		} else {
			await axios
				.post('/join/add', {
					id,
					pw,
					name,
					mail
				})
				.then((data) => {
					if (data.data.is_success) {
						window.alert('join success!');
						window.location.href = '/';
					} else {
						window.alert(
							'when joinning, something wrong!\nplease try again.'
						);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	});
