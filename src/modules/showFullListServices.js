const showFullListServices = () => {
	const headerMenuLinkWrapper = document.querySelector('.link-list-menu');
	const headerMenuLink = headerMenuLinkWrapper.firstElementChild;
	const fullListServices = document.querySelector('.popup-repair-types');

	const servLink = document.querySelector('.servLink');

	const stopScroll = () => {
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = 'hidden';
		document.body.style.height = '100%';
	};
	const startScroll = () => {
		document.body.style.height = '';
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = '';
	}
	
	document.body.addEventListener('click', e => {
		let targ = e.target;

		if (targ === headerMenuLink) {
			fullListServices.style.visibility = 'visible';
			stopScroll();
		} else if (targ === servLink) {
			fullListServices.style.visibility = 'visible';
			stopScroll();
		}
		
		if(targ.classList.contains('close') || targ.classList.contains('popup-repair-types') && fullListServices.style.visibility === 'visible') {
			fullListServices.style.visibility = 'hidden';
			startScroll();
		}
	});
};

export default showFullListServices;
