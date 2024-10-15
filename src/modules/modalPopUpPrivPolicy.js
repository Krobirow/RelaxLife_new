const modalPopUpPrivPolicy = () => {
	const popUpPrivacy = document.querySelector('.popup-privacy');
	const popupThank = document.querySelector('.popup-thank');

	const stopScroll = () => {
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = 'hidden';
		document.body.style.height = '100%';
	};
	const startScroll = () => {
		document.body.style.height = '';
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = '';
	};

	const handleEvent = (e) => {
		const target = e.target;

		// Обработчик для показа popUpPrivacy
		if (target.closest('.link-privacy')) {
			popUpPrivacy.style.visibility = 'visible';
			stopScroll();
		}

		// Обработчик для закрытия popupThank при клике на крестик или на сам popupThank
		if (target.closest('.popup-thank') || target.classList.contains('close')) {
			if (popupThank.style.visibility === 'visible') {
				popupThank.style.visibility = 'hidden';
				startScroll();
			}
		}

		// Обработчик для закрытия popUpPrivacy при клике на крестик
		if (target.classList.contains('close') && popUpPrivacy.style.visibility === 'visible') {
			popUpPrivacy.style.visibility = 'hidden';
			startScroll();
		}

		// Обработчик для закрытия popUpPrivacy при клике на крестик
		if (target.classList.contains('popup-privacy') && popUpPrivacy.style.visibility === 'visible') {
			popUpPrivacy.style.visibility = 'hidden';
			startScroll();
		}
	}

	document.body.addEventListener('click', e => handleEvent(e))
	document.body.addEventListener('touchend', e => handleEvent(e))
};

export default modalPopUpPrivPolicy;