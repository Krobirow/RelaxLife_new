const sliderDocuments = () => {

	const docSliderWrap = document.querySelector('.transparency-slider-wrap');
	const docSlides = document.querySelectorAll('.transparency-item');
	const docSliderArrRight = document.getElementById('transparency-arrow_right');
	const docSliderArrLeft = document.getElementById('transparency-arrow_left');
	const popUpAss = document.querySelector('.popup-transparency');

	const popupArrowPrev = document.getElementById('transparency_left');
	const popupArrowNext = document.getElementById('transparency_right');
	
	const sliderImages = document.querySelectorAll('.popup-transparency-slider img');

	const popupConsult = document.querySelector('.popup-consultation');
	const popUpPrivacy = document.querySelector('.popup-privacy');

	let count = 0;
	let ourWidth = window.innerWidth;

	window.addEventListener('resize', event => {
		ourWidth = event.target.innerWidth;
		checkerSlides();
	});

	const stopScroll = () => {
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = 'hidden';
		document.body.style.height = '100%';
	};
	const startScroll = () => {
		document.body.style.height = '';
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = '';
	};

	const checkerSlides = () => {
		if(ourWidth < 1090) {
			for (let i = 1; i < docSlides.length; i++) {
				if (docSlides[i].classList.contains('showedEl')) {
					docSlides[i].classList.remove('showedEl');
					docSlides[i].classList.add('hiddedEl');
				} else {
					docSlides[i].classList.add('showedEl');
				}
			}
		} 
		if(ourWidth > 1090){
			for (let i = 0; i < docSlides.length; i++) {
				docSlides[i].classList.remove('hiddedEl');
				docSlides[i].classList.add('showedEl');
			}
		}
	};

	checkerSlides();

	const renderSlides = (numberSlide, slides) => {
		slides.forEach((item, i) => {
			if(i === numberSlide) {
				item.classList.remove('hiddedEl');
				item.classList.add('showedEl');
			}

			if(i !== numberSlide) {
				item.classList.add('hiddedEl');
				item.classList.remove('showedEl');
			}
		});
	};

	document.body.addEventListener('click', e=> {
		let targ = e.target;
		if (targ === docSliderArrRight || targ === docSliderArrRight.firstElementChild) {
			count--;
			if (count < 0) {
				count = docSlides.length - 1;
			}
			renderSlides(count, docSlides);
		}

		if (targ === docSliderArrLeft ||targ === docSliderArrLeft.firstElementChild) {
			count++; 
			if (count === docSlides.length) {
				count = 0;
			}
			renderSlides(count, docSlides);
		}

		if (targ.matches('.transparency-item__img')) {
			popUpAss.style.visibility = 'visible';
			stopScroll();
			
		} 
		
		if (targ.matches('.close') || targ.classList.contains('popup-transparency')) {
			popUpAss.style.visibility = 'hidden';
			startScroll();
		}

		if (targ === popupArrowNext || targ === popupArrowNext.firstElementChild) {
			count--;
			if (count < 0) {
				count = sliderImages.length - 1;
			}
			renderSlides(count, sliderImages)
		}
		if (targ === popupArrowPrev || targ === popupArrowPrev.firstElementChild) {
			count++;
			if (count === sliderImages.length) {
				count = 0;
			}
			renderSlides(count, sliderImages)
		}
		//POPUP CONSULTATION
		if (targ.matches('.button_wide')) {
			stopScroll();
			popupConsult.style.visibility = 'visible';
		} 
		if (targ.matches('.close-consultation') || targ.classList.contains('popup-consultation')) {
			startScroll();
			popupConsult.style.visibility = 'hidden';
		}

		if(targ.classList.contains('link-privacy')) {
			stopScroll();
			popupConsult.style.visibility = 'hidden';
			popUpPrivacy.style.visibility = 'visible';
		} 
		if(targ.classList.contains('close') && popUpPrivacy.style.visibility === 'visible') {
			popUpPrivacy.style.visibility = 'hidden';
			startScroll();
		}

	});
};

export default sliderDocuments;