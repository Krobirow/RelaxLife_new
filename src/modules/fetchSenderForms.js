const fetchSenderForms = () => {
	const errorMessage = 'Something goes wrong...';

	const forms = document.querySelectorAll('form');
	const statusMessage = document.createElement('div');
	const inputs = document.body.querySelectorAll('input');

	const popupThank = document.querySelector('.popup-thank');

	statusMessage.style.cssText = `
		margin-left: 30px;
		font-size: 12px;
		color: #73b2ddc7;
	`;

	const postData = body => {
		return fetch("server.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
	};

	const formSend = ourForm => {
		const stopScroll = () => {
			const htmlTag = document.querySelector('html');
			htmlTag.style.overflowY = 'hidden';
			document.body.style.height = '100%';
		};

		(() => {
			event.preventDefault();
			ourForm.addEventListener('input', event => {
				let target = event.target;
				event.preventDefault();
				ourForm.appendChild(statusMessage);

				const checkPhone = /[^A-Za-zА-Яа-яЁё]/g;
				const checkName = /([А-Яа-яЁё]){2,}/g;

				let inputsPhone = ourForm.querySelector('input[name="phone"]');
				let inputsName = ourForm.querySelector('input[name="name"]');
				let formBtn = document.querySelectorAll('.form-btn');
				let checkbox = ourForm.querySelector('.checkbox__input');

				const onBtn = () => {
					formBtn.forEach(item => {
						item.removeAttribute('disabled');
					});
				};
				const offBtn = () => {
					formBtn.forEach(item => {
						item.setAttribute('disabled', true);
					});
				};

				if (target.contains(inputsName) && !checkName.test(inputsName.value)) {
					offBtn();
					statusMessage.textContent = `Используйте только русские буквы в имени!`;
					return;
				} else {
					onBtn();
					statusMessage.textContent = '';
				}

				if (target.contains(inputsPhone) && !inputsPhone.value.match(checkPhone)) {
					offBtn();
					statusMessage.textContent = `Максимальная длинна 16 символов!`;
					return;
				} else {
					onBtn();
					statusMessage.textContent = '';
				}

				if(!checkbox.checked && target.value.length > 17) {
					offBtn();
					statusMessage.textContent = `Галочка политики конф. обязательна!`;
					return;
				} else {
					onBtn();
					statusMessage.textContent = ``;
				}

			});
		})();

		(() => {
			ourForm.addEventListener('submit', event => {
				event.preventDefault();
				let checkbox = ourForm.querySelector('.checkbox__input');

				const loadAnimation = `
				<div class="sk-folding-cube">
					<div class="sk-cube1 sk-cube"></div>
					<div class="sk-cube2 sk-cube"></div>
					<div class="sk-cube4 sk-cube"></div>
					<div class="sk-cube3 sk-cube"></div>
				</div>
				`;

				ourForm.appendChild(statusMessage);
				const formData = new FormData(ourForm);
				let body = {};
				formData.forEach((val, key) => {
					return body[key] = val;
				});
				postData(body)
					.then(response => {
						if (response.status !== 200) {
							throw new Error(`response status is't 200!`);
						}
						return response;
					})
					.then(ourForm.insertAdjacentHTML('beforeend', loadAnimation))
					.then(() => {
						statusMessage.textContent = '';
						popupThank.style.visibility = 'visible';
						stopScroll();
						checkbox.checked = false;
						ourForm.lastElementChild.remove();
						body = {};
						inputs.forEach(items => {
							items.value = '';
						});
					})
					.catch(error => {
						statusMessage.textContent = errorMessage;
						console.error(error);
					});
			});
		})();
	};
	formSend(forms[0]);
	formSend(forms[1]);
	formSend(forms[2]);
	formSend(forms[3]);
	formSend(forms[4]);
	formSend(forms[5]);
};

export default fetchSenderForms;
