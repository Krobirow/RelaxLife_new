const repairSlaider = () => {
	const repairSliderContainer = document.getElementById('repair-types');

	const slidersBlock = document.querySelector('.repair-types-slider');

	const sliderCountCurrent = document.getElementById('slideCountRepairCurrent');
	const sliderCountTotal = document.getElementById('slideCountRepairTotal');
	
	const sliderArrRight = document.getElementById('repair-types-arrow_right');
	const sliderArrLeft = document.getElementById('repair-types-arrow_left');

	const tabButtonsMobile = document.querySelectorAll('.repair-types-carousel__item');
	const tabButtonsDesktop = document.querySelectorAll('.repair-types__item');
	
	// adaptive tabButtons switcher arrows
	const tabButtonsArrowRight = document.getElementById('nav-arrow-repair-right_base');
	const tabButtonsArrowLeft = document.getElementById('nav-arrow-repair-left_base');

	// all sliders inside wrapper
	const slider1 = document.querySelector('.types-repair1');
	const slider2 = document.querySelector('.types-repair2');
	const slider3 = document.querySelector('.types-repair3');
	const slider4 = document.querySelector('.types-repair4');
	const slider5 = document.querySelector('.types-repair5');
	
	// all slides of each sliders
	let firstChildren = [...slider1.children],
	secondChildren = [...slider2.children],
	thirdChildren = [...slider3.children],
	fourthChildren = [...slider4.children],
	fifthChildren = [...slider5.children];

	let count = 0;
	const slidesItems = slidersBlock.children;
	sliderCountTotal.textContent = slidesItems[0].children.length;

	repairSliderContainer.addEventListener('click', e=> {
		let targ = e.target;

		// sliderBlock switcher
		for (let j = 0; j < tabButtonsMobile.length; j++) {
			
			if (targ === tabButtonsMobile[j].lastElementChild || targ === tabButtonsDesktop[j].lastElementChild) {

				for (let i = 0; i < slidesItems.length; i++) {
					tabButtonsMobile[i].classList.remove('active');
					tabButtonsDesktop[i].classList.remove('active');
					slidesItems[i].style.display = 'none';

					if (targ === tabButtonsMobile[i].lastElementChild || targ === tabButtonsDesktop[i].lastElementChild) {
						count = 0;
						sliderCountCurrent.textContent = 1;
						sliderCountTotal.textContent = slidesItems[i].children.length;
						tabButtonsMobile[j].classList.add('active');
						tabButtonsDesktop[j].classList.add('active');
						slidesItems[i].style.display = 'block';
					}
				}
			}
		}

		if(targ === sliderArrLeft.firstElementChild || targ === sliderArrLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('.slider-arrow_left');
		} else if(targ === sliderArrRight.firstElementChild || targ === sliderArrRight.firstElementChild.firstElementChild) {
			targ = targ.closest('.slider-arrow_right');
		} else if(targ === tabButtonsArrowLeft.firstElementChild || targ === tabButtonsArrowLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('.nav-arrow_left');
		} else if(targ === tabButtonsArrowRight.firstElementChild || targ === tabButtonsArrowRight.firstElementChild.firstElementChild) {
			targ = targ.closest('.nav-arrow_right');
		} else {
			targ = e.target;
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
				count--;
				if (count < 0) {
					count = anySlider.children.length - 1;
				}
				sliderCountCurrent.textContent = count + 1;
				renderSlides(count);
			}
	
			if (targ === sliderArrRight && anySlider.style.display === 'block') {
				count++; 
				if (count === anySlider.children.length) {
					count = 0;
				}
				sliderCountCurrent.textContent = count + 1;
				renderSlides(count);
			}
		};

		startSliders(firstChildren, slider1);
		startSliders(secondChildren, slider2);
		startSliders(thirdChildren, slider3);
		startSliders(fourthChildren, slider4);
		startSliders(fifthChildren, slider5);
	});
};

export default repairSlaider;