const pleasingScrollToLinks = () => {

	const menu = document.querySelector('.popup-menu-nav');
	const menuLi = menu.querySelectorAll('.popup-menu-nav__item>a');

	const btnFooterScrollUp = document.querySelector('.button-footer');
	const footerLinkScrollUp = btnFooterScrollUp.firstElementChild;

	footerLinkScrollUp.addEventListener('click', e => {
		e.preventDefault();
		const getId = footerLinkScrollUp.getAttribute('href');

		document.querySelector(getId).scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});

	for (let key of menuLi) {
		key.addEventListener('click', e => {
			e.preventDefault();
			const linkId = key.getAttribute('href');

			document.querySelector(linkId).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}
};

export default pleasingScrollToLinks;