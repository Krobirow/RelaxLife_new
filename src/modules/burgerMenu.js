const burgerMenu = () => {
	const ourHeaderPopUpMenu = document.querySelector('.popup-dialog-menu');
	ourHeaderPopUpMenu.style.opacity = '0';
	let ourWidth;
	ourWidth = document.documentElement.offsetWidth;
	if(ourWidth < 580) {
		ourHeaderPopUpMenu.style.transform = 'translate3d(0,-100vh,0)';
	} 
	if(ourWidth > 580){
		ourHeaderPopUpMenu.style.transform = 'translate3d(645px,0,0)';
	}
	window.addEventListener('resize', event => {
		ourWidth = event.target.innerWidth;
		if(ourWidth < 580) {
			ourHeaderPopUpMenu.style.transform = 'translate3d(0,-100vh,0)';
		} else if(ourWidth > 580){
			ourHeaderPopUpMenu.style.transform = 'translate3d(645px,0,0)';
		}
	})
	
	document.body.addEventListener('click', e => {
		let targ = e.target;

		if(targ.classList.contains('menu__icon') || targ.classList.contains('menu__title')) {
			targ = targ.closest('.menu');
		} else {
			targ = e.target
		}

		if(targ.classList.contains('menu')) {
			ourHeaderPopUpMenu.style.opacity = '1';
			ourHeaderPopUpMenu.style.transform = 'translate3d(0,0,0)';
		} else {
			if(ourWidth < 576) {
				ourHeaderPopUpMenu.style.opacity = '0';
				ourHeaderPopUpMenu.style.transform = 'translate3d(0,-100vh,0)';
			} else if(ourWidth > 576){
				ourHeaderPopUpMenu.style.opacity = '0';
				ourHeaderPopUpMenu.style.transform = 'translate3d(645px,0,0)';
			}
		}
	});
};

export default burgerMenu;