const visibleTelList = () => {
	const headerCotactsWrapper = document.querySelector('.header-contacts-wrap');
	const headerContactsArrow = document.querySelector('.header-contacts__arrow');

	headerContactsArrow.addEventListener('click', e => {
		if(!headerContactsArrow.classList.contains('clicked')) {
			headerContactsArrow.classList.add('clicked');
			headerCotactsWrapper.lastElementChild.style.top = '20px';
			headerCotactsWrapper.lastElementChild.firstElementChild.style.opacity = '1';
			headerContactsArrow.style.transform = 'rotateX(180deg)';
		} else if(headerContactsArrow.classList.contains('clicked')) {
			headerContactsArrow.classList.remove('clicked');
			headerCotactsWrapper.lastElementChild.style.top = '0';
			headerCotactsWrapper.lastElementChild.firstElementChild.style.opacity = '0';
			headerContactsArrow.style.transform = 'rotateX(0deg)';
		}
	});
};

export default visibleTelList;