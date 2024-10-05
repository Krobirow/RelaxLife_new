const portfolioPopUpSlider = () => {
	const popUpPortfolio = document.querySelector('.popup-portfolio');

	// slides wrapper
	const popUpPortfSlidesWrap = document.querySelector('.popup-portfolio-slider');
	const allSlides = document.querySelectorAll('.popup-portfolio-slider__slide');

	// slider description text 
	const popUpPortfAllDescr = document.querySelectorAll('.popup-portfolio-text');

	// slider controls
	const arrRight = document.getElementById('popup_portfolio_right');
	const arrLeft = document.getElementById('popup_portfolio_left');
	const slideCountPortfolioTotal = document.getElementById('slideCountPortfolioTotal');
	const slideCountPortfolioCurrent = document.getElementById('slideCountPortfolioCurrent');

	// technical variables and func
	let count1 = 0;
	const startScroll = () => {
		document.body.style.height = '';
		const htmlTag = document.querySelector('html');
		htmlTag.style.overflowY = '';
	};
	const slidesItems = popUpPortfSlidesWrap.children;

	slideCountPortfolioTotal.innerHTML = allSlides.length;

	popUpPortfolio.addEventListener('click', e => {
		let targ = e.target;

		if(targ.classList.contains('close') || targ.classList.contains('popup-portfolio')) {
			popUpPortfolio.style.visibility = 'hidden';
			startScroll();
		}

		if (targ === arrLeft.firstElementChild  || targ === arrLeft.firstElementChild.firstElementChild) {
			targ = targ.closest('#popup_portfolio_left');
		} else if (targ === arrRight.firstElementChild  || targ === arrRight.firstElementChild.firstElementChild) {
			targ = targ.closest('#popup_portfolio_right');
		} else {
			targ = e.target;
		}

		// description on
		for (let i = 0; i < allSlides.length; i++) {
			if (allSlides[i].style.display === 'block') {
				popUpPortfAllDescr.forEach(item => {item.style.display = 'none';});
				popUpPortfAllDescr[i].style.display = 'flex';
			}
		}

		const startSlidesChange = (sliderChilds, anySlider) => {
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
				count1--;
				if (count1 < 0) {
					count1 = anySlider.children.length - 1;
				}
				slideCountPortfolioCurrent.innerHTML = count1 + 1;
				slideCountPortfolioTotal.innerHTML = anySlider.children.length;
				renderSlides(count1);
			}

			if (targ === arrRight && anySlider.style.display === 'block') {
				count1++; 
				if (count1 === anySlider.children.length) {
					count1 = 0;
				}
				slideCountPortfolioCurrent.innerHTML = count1 + 1;
				slideCountPortfolioTotal.innerHTML = anySlider.children.length;
				renderSlides(count1);
			}
		};

		startSlidesChange(slidesItems, popUpPortfSlidesWrap);
	});
};

export default portfolioPopUpSlider;