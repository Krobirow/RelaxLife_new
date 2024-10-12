const designerSolutTabsSliders = () => {
	const designsContainer = document.getElementById('designs');
	const designsBtnContainer = document.getElementById('designs-list');
	const designsBtnList = document.querySelectorAll('.designs-nav__item');
	
	const designsSliderContainer = document.querySelector('.designs-slider');
	const sliderCountTotal = document.getElementById('slideCountDesignTotal');
	const sliderCountCurrent = document.getElementById('slideCountDesignCurrent');

	// adaptive controls 
	const tabsArrLeft = document.getElementById('nav-arrow-designs_left');
	const tabsArrRight = document.getElementById('nav-arrow-designs_right');
	const sliderArrRight = document.getElementById('design_right');
	const sliderArrLeft = document.getElementById('design_left');

	// previu pagination 
	let designePrevBlock = document.querySelectorAll('.designePrevBlock');

	const prevBlockItems = document.querySelectorAll('.preview-block__item-inner');
	const allSlides = document.querySelectorAll('.designs-slider__style-slide');

	// popUp design 
	const popupDesign = document.querySelector('.popup-design');
	const popupCallerLink = document.querySelector('.link-list-designs');

	// all sliders inside wrapper
	const slider1 = document.querySelector('.designs-slider__style1');
	const slider2 = document.querySelector('.designs-slider__style2');
	const slider3 = document.querySelector('.designs-slider__style3');
	const slider4 = document.querySelector('.designs-slider__style4');
	const slider5 = document.querySelector('.designs-slider__style5');

	// all slides of each sliders
	let firstChildren = [...slider1.children],
		secondChildren = [...slider2.children],
		thirdChildren = [...slider3.children],
		fourthChildren = [...slider4.children],
		fifthChildren = [...slider5.children];

	// technical variables
	let ourWidth;
	let count = 0;
	let count1 = 0;
	const slidesItems = designsSliderContainer.children;

	const stopScroll = () => {
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = 'hidden';
		document.body.style.height = '100%';
	};

	designsContainer.addEventListener('click', e=> {
		ourWidth = window.innerWidth;
		let targ = e.target;

		if (targ === popupCallerLink.firstElementChild || targ === popupCallerLink.firstElementChild.lastElementChild || targ === popupCallerLink.firstElementChild.lastElementChild.firstElementChild) {
			popupDesign.style.visibility = 'visible';
			stopScroll();
		}

		// pagination start work!
		for (let i = 0; i < prevBlockItems.length; i++) {
			if (targ === prevBlockItems[i]) {
				prevBlockItems[i].classList.add('preview_active');
				allSlides.forEach(item => {item.style.display = 'none';});
				allSlides[i].style.display = 'block';
			} else if (targ !== prevBlockItems[i]) {
				prevBlockItems[i].classList.remove('preview_active');
			}
		}

		// sliderBlock switcher
		for (let j = 0; j < designsBtnList.length; j++) {
			
			if (targ === designsBtnList[j]) {

				for (let i = 0; i < slidesItems.length; i++) {
					designsBtnList[i].classList.remove('active');
					slidesItems[i].style.display = 'none';
					designePrevBlock[i].classList.remove('visible');

					if (targ === designsBtnList[i]) {
						count1 = 0;
						sliderCountCurrent.innerHTML = 1;
						sliderCountTotal.innerHTML = slidesItems[i].children.length;
						designsBtnList[j].classList.add('active');
						slidesItems[i].style.display = 'block';
						designePrevBlock[i].classList.add('visible');

						allSlides.forEach(item => {
							item.style.display = 'block';
						});
					}
				}
			}
		}

		if(targ === tabsArrLeft.firstElementChild  || targ === tabsArrLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('#nav-arrow-designs_left');
		} else if (targ === tabsArrRight.firstElementChild  || targ === tabsArrRight.firstElementChild.firstElementChild) {
			targ = targ.closest('#nav-arrow-designs_right');
		} else if(targ === sliderArrLeft.firstElementChild  || targ === sliderArrLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('#design_left');
		} else if (targ === sliderArrRight.firstElementChild  || targ === sliderArrRight.firstElementChild.firstElementChild) {
			targ = targ.closest('#design_right');
		} else {
			targ = e.target;
		}

		window.addEventListener('resize', event => {
			ourWidth = event.target.innerWidth;
			if(ourWidth > 1136) {
				designsBtnContainer.style.transform = `translateX(0px)`;
			}
		});

		let btn1 = designsBtnList[0].getBoundingClientRect();
		let btn5 = designsBtnList[4].getBoundingClientRect();

		const translateLeft = () => {
			if (ourWidth > 1025 && ourWidth < 1136) {
				count -= 180;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();
				if(btn1.x < 170 && btn5.x > 850) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -180;
				}
			}

			if (ourWidth < 1025 && ourWidth > 769) {
				count -= 180;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 170 && btn5.x > 650) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -180;
				}
			}

			if (ourWidth < 769 && ourWidth > 578) { 
				count -= 205;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();

				if(btn1.x < 120 && btn5.x > 550) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -205;
				}
			}

			if (ourWidth < 578) { 
				count -= 215;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();

				if(btn1.x < 155 && btn5.x > 300) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = -215;
				}
			}
		}

		const translateRight = () => {
			if (ourWidth > 1025 && ourWidth < 1136) {
				count += 180;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 780) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 180;
				}
			}
			if (ourWidth < 1025 && ourWidth > 769) {	
				count += 180;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 980) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 180;
				}
			}

			if (ourWidth < 769 && ourWidth > 578) {
				count += 205;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 980) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
				} 
				else {
					count = 205;
				}
			}

			if (ourWidth < 578) {
				count += 215;
				btn1 = designsBtnList[0].getBoundingClientRect();
				btn5 = designsBtnList[4].getBoundingClientRect();
				
				if(btn1.x < 20 && btn5.x < 980) {
					designsBtnContainer.style.transform = `translateX(${count}px)`;
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

export default designerSolutTabsSliders;