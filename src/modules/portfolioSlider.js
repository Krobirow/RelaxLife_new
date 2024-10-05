const portfolioSlider = () => {
	const portfolioContainer = document.getElementById('portfolio');

	const portfSlides = document.querySelectorAll('.portfolio-slider__slide');
	const portfolioWrapper = document.querySelector('.portfolio-slider__wrapper');

	const arrRight = document.getElementById('portfolio-arrow_right');
	const arrLeft = document.getElementById('portfolio-arrow_left');

	const sliderCountCurrent = document.getElementById('slideCountPortfolioCurrentSmall');
	const sliderCountTotal = document.getElementById('slideCountPortfolioTotalSmall');

	const portfolioSliderMobile = document.querySelector('.portfolio-slider-mobile');
	const arrLeftMob = document.getElementById('portfolio-arrow-mobile_left');
	const arrRightMob = document.getElementById('portfolio-arrow-mobile_right');

	// all sliders inside wrapper
	const slider1 = document.querySelector('.portfolio-slider-1');
	const slider2 = document.querySelector('.portfolio-slider-2');
	const slider3 = document.querySelector('.portfolio-slider-3');
	const slider4 = document.querySelector('.portfolio-slider-4');

	sliderCountTotal.innerHTML = slider1.children.length;

	// all slides of each sliders
	let firstChildren = [...slider1.children],
		secondChildren = [...slider2.children],
		thirdChildren = [...slider3.children],
		fourthChildren = [...slider4.children];

	// popUpStart
	const itemHoverLinks = document.querySelectorAll('.item-hover');
	const popUpPortfolio = document.querySelector('.popup-portfolio');

	// technical variables and func
	let ourWidth = window.innerWidth;
	let count = 0;
	let count1 = 0;
	let count2 = 0;
	let totalCouterLength;
	let widthFirstSlide = portfSlides[0].offsetWidth;
	const slidesItems = portfolioSliderMobile.children;

	const stopScroll = () => {
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = 'hidden';
		document.body.style.height = '100%';
	};

	window.addEventListener('resize', event => {
		ourWidth = event.target.innerWidth;
		widthFirstSlide = portfSlides[0].offsetWidth;

		if (ourWidth > 578) {
			portfolioSliderMobile.style.display = 'none';
			arrRight.style.display = 'flex';
		}
		if (ourWidth < 578) {
			portfolioSliderMobile.style.display = 'block';
			arrLeft.style.display = 'none';
			arrRight.style.display = 'none';
		}
	});

	portfolioContainer.addEventListener('click', e=> {
		ourWidth = window.innerWidth;
		let targ = e.target;

		for (let h = 0; h < itemHoverLinks.length; h++) {
			if(targ === itemHoverLinks[h] || targ === itemHoverLinks[h].firstElementChild || targ === itemHoverLinks[h].lastElementChild) {
				popUpPortfolio.style.visibility = 'visible';
				stopScroll();
			}
		}

		if (targ === arrLeft.firstElementChild  || targ === arrLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('#portfolio-arrow_left');
		} else if (targ === arrRight.firstElementChild  || targ === arrRight.firstElementChild.firstElementChild) {
			targ = targ.closest('#portfolio-arrow_right');
		} else if (targ === arrLeftMob.firstElementChild  || targ === arrLeftMob.firstElementChild.firstElementChild) {
			targ = targ.closest('#portfolio-arrow-mobile_left');
		} else if (targ === arrRightMob.firstElementChild  || targ === arrRightMob.firstElementChild.firstElementChild) {
			targ = targ.closest('#portfolio-arrow-mobile_right');
		} else {
			targ = e.target;
		}

		const startSlidesChange = (sliderChilds, anySlider) => {
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

			if (targ === arrLeftMob && anySlider.style.display === 'block') {
				count1--;
				if (count1 < 0) {
					count1 = anySlider.children.length - 1;
				}
				sliderCountCurrent.innerHTML = count1 + 1;
				sliderCountTotal.innerHTML = anySlider.children.length;
				renderSlides(count1);
			}

			if (targ === arrRightMob && anySlider.style.display === 'block') {
				count1++; 
				if (count1 === anySlider.children.length) {
					count1 = 0;
				}
				sliderCountCurrent.innerHTML = count1 + 1;
				sliderCountTotal.innerHTML = anySlider.children.length;
				renderSlides(count1);
			}
		};

		const startSlidersChange = (sliderChilds, anySlider) => {
			const renderSlides = (numberSlide) => {
				[...sliderChilds].forEach((item, i) => {
					if(i === numberSlide) {
						item.style.display = 'block';
					}

					if(i !== numberSlide) {
						item.style.display = 'none';
					}
				});
			};

			if (targ === arrLeft && anySlider.style.display === 'block') {
				count1 = 0;
				count2--;
				if (count2 < 0) {
					count2 = anySlider.children.length - 1;
				}

				if (slider1.style.display === 'block') {
					totalCouterLength = slider4.children.length;
				} 
				if (slider2.style.display === 'block') {
					totalCouterLength = slider1.children.length;
				} 
				if (slider3.style.display === 'block') {
					totalCouterLength = slider2.children.length;
				}
				if (slider4.style.display === 'block') {
					totalCouterLength = slider3.children.length;
				}
				sliderCountCurrent.innerHTML = 1;
				sliderCountTotal.innerHTML = totalCouterLength;
				renderSlides(count2);
			}

			if (targ === arrRight && anySlider.style.display === 'block') {
				count1 = 0;
				count2++; 
				if (count2 === anySlider.children.length) {
					count2 = 0;
				}

				if (slider1.style.display === 'block') {
					totalCouterLength = slider2.children.length;
				} 
				if (slider2.style.display === 'block') {
					totalCouterLength = slider3.children.length;
				} 
				if (slider3.style.display === 'block') {
					totalCouterLength = slider4.children.length;
				}
				if (slider4.style.display === 'block') {
					totalCouterLength = slider1.children.length;
				}
				sliderCountCurrent.innerHTML = 1;
				sliderCountTotal.innerHTML = totalCouterLength;
				renderSlides(count2);
			}
		};

		const arrRigthClick = () => {
			count += widthFirstSlide;
			portfolioWrapper.style.transform = `translateX(-${count}px)`;
		}
		const arrLeftClick = () => {
			count -= widthFirstSlide;
			portfolioWrapper.style.transform = `translateX(-${count}px)`;
		}

		if (ourWidth > 578) {
			if(targ === arrRight) {
				count++;
				arrRigthClick();
			}

			if (targ === arrLeft) {
				count--;
				arrLeftClick();
			}

			if (portfolioWrapper.style.transform === `translateX(-706px)`) {
				arrLeft.style.display = 'flex';
				arrRight.style.display = 'none';
			}

			if(portfolioWrapper.style.transform === `translateX(0px)`) {
				arrLeft.style.display = 'none';
				arrRight.style.display = 'flex';
			}
		} 
		
		if (ourWidth < 578) {
			startSlidesChange(firstChildren, slider1);
			startSlidesChange(secondChildren, slider2);
			startSlidesChange(thirdChildren, slider3);
			startSlidesChange(fourthChildren, slider4);
		}
	});
};

export default portfolioSlider;
