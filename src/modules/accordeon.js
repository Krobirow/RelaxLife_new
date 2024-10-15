const accordeon = () => {
	const accordeonContainer = document.getElementById('faq');
	let touchEventHandled = false; // Flag to prevent double triggering

	const handleEvent = (e) => {
		let targ = e.target;
		const titleBlockList = accordeonContainer.querySelectorAll('.title_block');

		// Prevent further click events if touchend was handled
		if (e.type === 'touchend') {
			touchEventHandled = true;
		} else if (e.type === 'click' && touchEventHandled) {
			touchEventHandled = false;
			return;
		}

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