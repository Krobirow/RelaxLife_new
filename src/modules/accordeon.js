const accordeon = () => {
	const accordeonContainer = document.getElementById('faq');
	const titleBlockList = accordeonContainer.querySelectorAll('.title_block');

	titleBlockList[0].nextElementSibling.style.height = '100%';
	titleBlockList[0].classList.add('msg-active');

	const handleEvent = (e) => {
		let targ = e.target;

		if (targ.classList.contains('title_block') && !targ.classList.contains('msg-active')) {
			titleBlockList.forEach(item => {
				item.classList.remove('msg-active');
				item.nextElementSibling.style.height = '0px';
			})
			targ.nextElementSibling.style.height = '100%';
			targ.classList.add('msg-active');
		} else if (targ.classList.contains('title_block') && targ.classList.contains('msg-active')) {
			targ.classList.remove('msg-active');
			targ.nextElementSibling.style.height = '0px';
		}
	}

	accordeonContainer.addEventListener('click', e => handleEvent(e));
	accordeonContainer.addEventListener('touchend', e => handleEvent(e));
};

export default accordeon;