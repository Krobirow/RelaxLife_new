const howWeWorkTabs = () => {


	const schemeId = document.getElementById('scheme');
	const schemeBtnBlock = document.getElementById('scheme-list');
	const schemeBtnList = document.querySelectorAll('.scheme-nav__item');

	const schemeSlider = document.querySelector('.scheme-slider');
	const schemeSliderSlides = document.querySelectorAll('.scheme-slider__slide');
	const schemeSliderDescrBlock = document.querySelectorAll('.scheme-description-block');

	const tabButtonsArrowLeft = document.getElementById('nav-arrow-scheme_left');
	const tabButtonsArrowRight = document.getElementById('nav-arrow-scheme_right');

	let ourWidth;
	let count = 0;

	schemeId.addEventListener('click', e=> {
		ourWidth = window.innerWidth;
		let targ = e.target;

		// sliderBlock switcher
		for (let j = 0; j < schemeBtnList.length; j++) {
			
			if (targ === schemeBtnList[j]) {

				for (let i = 0; i < schemeSliderDescrBlock.length; i++) {
					schemeBtnList[i].classList.remove('active');
					schemeSliderSlides[i].style.display = 'none';
					schemeSliderDescrBlock[i].style.display = 'none';

					if (targ === schemeBtnList[i]) {
						schemeBtnList[j].classList.add('active');
						schemeSliderSlides[i].style.display = 'block';
						schemeSliderDescrBlock[i].style.display = 'block';
					}
				}
			}
		}

		if (targ === tabButtonsArrowLeft.firstElementChild  || targ === tabButtonsArrowLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('#nav-arrow-scheme_left');
		} else if (targ === tabButtonsArrowRight.firstElementChild  || targ === tabButtonsArrowRight.firstElementChild.firstElementChild) {
			targ = targ.closest('#nav-arrow-scheme_right');
		} else {
			targ = e.target;
		}

		window.addEventListener('resize', event => {
			ourWidth = event.target.innerWidth;
			if(ourWidth > 1136) {
				schemeBtnBlock.style.transform = `translateX(0px)`;
			}
		});

		let btn1;
		let btn6;
		const translateLeft = () => {
			if (ourWidth > 1025 && ourWidth < 1136) {
				count -= 180;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();
				
				if(btn1.x < 170 && btn6.x > 850) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -180;
				}
			}

			if (ourWidth < 1025 && ourWidth > 769) {
				count -= 180;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();
				
				if(btn1.x < 170 && btn6.x > 750) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -180;
				}
			}

			if (ourWidth < 769 && ourWidth > 578) { 
				count -= 205;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();

				if(btn1.x < 120 && btn6.x > 550) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -205;
				}
			}

			if (ourWidth < 578) { 
				count -= 205;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();

				if(btn1.x < 155 && btn6.x > 300) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -205;
				}
			}
		}

		const translateRight = () => {
			if (ourWidth > 1025 && ourWidth < 1136) {
				count += 180;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();
				
				if(btn1.x < 20 && btn6.x < 980) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 180;
				}
			}
			if (ourWidth < 1025 && ourWidth > 769) {	
				count += 180;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();
				
				if(btn1.x < 20 && btn6.x < 980) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 180;
				}
			}

			if (ourWidth < 769 && ourWidth > 578) {
				count += 205;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();
				
				if(btn1.x < 20 && btn6.x < 980) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 205;
				}
			}

			if (ourWidth < 578) {
				count += 205;
				btn1 = schemeBtnList[0].getBoundingClientRect();
				btn6 = schemeBtnList[5].getBoundingClientRect();
				
				if(btn1.x < 20 && btn6.x < 980) {
					schemeBtnBlock.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 205;
				}
			}
		}
		
		if (targ === tabButtonsArrowLeft) {
			translateRight();
			count++;
		}
		if (targ === tabButtonsArrowRight) {
			count--;
			translateLeft();
		}
	});
};

export default howWeWorkTabs;
