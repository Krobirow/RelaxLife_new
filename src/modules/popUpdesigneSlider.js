const popUpdesigneSlider = () => {
	// popUp design 
	const popupDesign = document.querySelector('.popup-design');

	// controls
	const popUpDesBtnContainer = document.getElementById('nav-list-popup-designs'),
		popUpDesBtnList = document.querySelectorAll('.designs-nav__item_popup'),
		sliderCountCurrent = document.getElementById('slideCountPopUpDesignCurrent'),
		sliderCountTotal = document.getElementById('slideCountPopUpDesignTotal');
	
	const tabsArrLeft = document.getElementById('nav-arrow-popup-designs_left'),
		tabsArrRight = document.getElementById('nav-arrow-popup-designs_right'),
		sliderArrLeft = document.getElementById('popup_design_left'),
		sliderArrRight = document.getElementById('popup_design_right');

	// slider elems 
	const popUpdesignsSliderContainer = document.querySelector('.popup-design-slider');
	const popUpTextDescr = document.querySelectorAll('.popup-design-text');

	// all sliders inside wrapper
	const slider1 = document.querySelector('.popup-designs-slider__style1');
	const slider2 = document.querySelector('.popup-designs-slider__style2');
	const slider3 = document.querySelector('.popup-designs-slider__style3');
	const slider4 = document.querySelector('.popup-designs-slider__style4');
	const slider5 = document.querySelector('.popup-designs-slider__style5');

	// all slides of each sliders
	let firstChildren = [...slider1.children],
		secondChildren = [...slider2.children],
		thirdChildren = [...slider3.children],
		fourthChildren = [...slider4.children],
		fifthChildren = [...slider5.children];

	// technical variables and func
	let ourWidth;
	let count = 0;
	let count1 = 0;
	const startScroll = () => {
		document.body.style.height = '';
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = '';
	};

	const slidesItems = popUpdesignsSliderContainer.children;

	window.addEventListener('resize', event => {
		ourWidth = event.target.innerWidth;
		if(ourWidth > 1136) {
			popUpDesBtnContainer.style.transform = `translateX(0px)`;
		}
	});

	popupDesign.addEventListener('click', e=> {
		ourWidth = window.innerWidth;
		let targ = e.target;

		if (targ.classList.contains('close') || targ.classList.contains('popup-design') && popupDesign.style.visibility === 'visible') {
			popupDesign.style.visibility = 'hidden';
			startScroll();
		}

		// sliderBlock switcher
		for (let j = 0; j < popUpDesBtnList.length; j++) {
			
			if (targ === popUpDesBtnList[j]) {

				for (let i = 0; i < slidesItems.length; i++) {
					popUpDesBtnList[i].classList.remove('active');
					slidesItems[i].style.display = 'none';
					popUpTextDescr[i].style.display= 'none';

					if (targ === popUpDesBtnList[i]) {
						count1 = 0;
						sliderCountCurrent.innerHTML = 1;
						sliderCountTotal.innerHTML = slidesItems[i].children.length;
						popUpDesBtnList[j].classList.add('active');
						slidesItems[i].style.display = 'block';
						popUpTextDescr[i].style.display= 'block';
					}
				}
			}
		}

		if(targ === tabsArrLeft.firstElementChild  || targ === tabsArrLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('#nav-arrow-popup-designs_left');
		} else if (targ === tabsArrRight.firstElementChild  || targ === tabsArrRight.firstElementChild.firstElementChild) {
			targ = targ.closest('#nav-arrow-popup-designs_right');
		} else if(targ === sliderArrLeft.firstElementChild  || targ === sliderArrLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('#popup_design_left');
		} else if (targ === sliderArrRight.firstElementChild  || targ === sliderArrRight.firstElementChild.firstElementChild) {
			targ = targ.closest('#popup_design_right');
		} else {
			targ = e.target;
		}



		let btn1 = popUpDesBtnList[0].getBoundingClientRect();
		let btn5 = popUpDesBtnList[4].getBoundingClientRect();

		const translateLeft = () => {
			if (ourWidth > 1025 && ourWidth < 1136) {
				count -= 180;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();
				if(btn1.x < 170 && btn5.x > 850) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -180;
				}
			}

			if (ourWidth < 1025 && ourWidth > 769) {
				count -= 180;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 170 && btn5.x > 650) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -180;
				}
			}

			if (ourWidth < 769 && ourWidth > 578) { 
				count -= 205;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();

				if(btn1.x < 120 && btn5.x > 550) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -205;
				}
			}

			if (ourWidth < 578) { 
				count -= 215;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();

				if(btn1.x < 155 && btn5.x > 300) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -215;
				}
			}
		}

		const translateRight = () => {
			if (ourWidth > 1025 && ourWidth < 1136) {
				count += 180;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 780) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 180;
				}
			}
			if (ourWidth < 1025 && ourWidth > 769) {	
				count += 180;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 980) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 180;
				}
			}

			if (ourWidth < 769 && ourWidth > 578) {
				count += 205;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 980) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 205;
				}
			}

			if (ourWidth < 578) {
				count += 215;
				btn1 = popUpDesBtnList[0].getBoundingClientRect();
				btn5 = popUpDesBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 980) {
					popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 215;
				}
			}
		}

		if (targ === tabsArrLeft) {
			translateRight();
			count++;
		}
		if (targ === tabsArrRight) {
			count--;
			translateLeft();
		}

		
		const startSliders = (sliderChilds, anySlider) => {

			const renderSlides = (numberSlide) => {
				sliderChilds.forEach((item, i) => {

					if(i === numberSlide) {
						item.style.display = 'block';
					}
		
					if(i !== numberSlide) {
						item.style.display = 'none';
					}
				});
			};

			if (targ === sliderArrLeft && anySlider.style.display === 'block') {
				count1--;
				if (count1 < 0) {
					count1 = anySlider.children.length - 1;
				}
				sliderCountCurrent.innerHTML = count1 + 1;
				renderSlides(count1);
			}

			if (targ === sliderArrRight && anySlider.style.display === 'block') {
				count1++; 
				if (count1 === anySlider.children.length) {
					count1 = 0;
				}
				sliderCountCurrent.innerHTML = count1 + 1;
				renderSlides(count1);
			}
		};

		startSliders(firstChildren, slider1);
		startSliders(secondChildren, slider2);
		startSliders(thirdChildren, slider3);
		startSliders(fourthChildren, slider4);
		startSliders(fifthChildren, slider5);
	});
};

export default popUpdesigneSlider;