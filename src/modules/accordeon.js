const accordeon = () => {
	const accordeonContainer = document.getElementById('faq');
	const titleBlockList = document.querySelectorAll('.title_block');

	accordeonContainer.addEventListener('click', e=> {
		let targ = e.target;

			if(targ.classList.contains('title_block') && !targ.classList.contains('msg-active')) {
				titleBlockList.forEach(item => {
					item.classList.remove('msg-active');
					item.nextElementSibling.style.height = '0px';
				})
				targ.nextElementSibling.style.height = '400px';
				targ.classList.add('msg-active');
			} else if (targ.classList.contains('title_block') && targ.classList.contains('msg-active')) {
				targ.classList.remove('msg-active');
				targ.nextElementSibling.style.height = '0px';
			}

	});
};

export default accordeon;