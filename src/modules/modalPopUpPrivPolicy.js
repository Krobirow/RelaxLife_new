const modalPopUpPrivPolicy = () => {
	const popUpPrivacy = document.querySelector('.popup-privacy');
	const spanLinkPrivacy = document.querySelector('.link-privacy');
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

	spanLinkPrivacy.addEventListener('click', e => {
		popUpPrivacy.style.visibility = 'visible';
		stopScroll();
	});

	popupThank.addEventListener('click', e => {
		if (e.target.classList.contains('close') || e.target.classList.contains('popup-thank')  && popupThank.style.visibility === 'visible') {
			popupThank.style.visibility = 'hidden';
			startScroll();
		}
	})
	

	popUpPrivacy.addEventListener('click', e => {
		let targ = e.target;
		if(targ.classList.contains('close') && popUpPrivacy.style.visibility === 'visible') {
			popUpPrivacy.style.visibility = 'hidden';
			startScroll();
		}
	});
};

export default modalPopUpPrivPolicy;