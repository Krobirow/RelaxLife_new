const howWeWorkTabs = () => {
	const schemeId = document.getElementById('scheme');
	const schemeBtnBlock = document.getElementById('scheme-list');
	const schemeBtnList = document.querySelectorAll('.scheme-nav__item');
	const schemeSliderSlides = document.querySelectorAll('.scheme-slider__slide');
	const schemeSliderDescrBlock = document.querySelectorAll('.scheme-description-block');
	
	const tabButtonsArrowLeft = document.getElementById('nav-arrow-scheme_left');
	const tabButtonsArrowRight = document.getElementById('nav-arrow-scheme_right');

	let count = 0;
	let isTransitioning = false;
	const stepSize = 200;
	let touchEventHandled = false; // Flag to prevent double triggering

	const getSliderBounds = () => schemeBtnBlock.getBoundingClientRect();
	const getTabBounds = (index) => schemeBtnList[index].getBoundingClientRect();
	const getTotalWidth = () => schemeBtnBlock.scrollWidth;
	const getVisibleWidth = () => schemeBtnBlock.parentElement.offsetWidth;

	const updateButtonsState = () => {
			const firstTabBounds = getTabBounds(0);
			const lastTabBounds = getTabBounds(schemeBtnList.length - 1);
			const sliderBounds = getSliderBounds();

			// Disable left arrow if the first tab is fully visible
			tabButtonsArrowLeft.disabled = (firstTabBounds.left - 10) >= sliderBounds.left;
			// Disable right arrow if the last tab is fully visible
			tabButtonsArrowRight.disabled = (lastTabBounds.right + 10) <= sliderBounds.right;
	};

	const translate = (direction) => {
			if (isTransitioning) return;

			const totalWidth = getTotalWidth();
			const visibleWidth = getVisibleWidth();

			// Calculate the new scroll position
			const newCount = count + direction * stepSize;
			const maxScroll = totalWidth - visibleWidth;

			// Ensure we don't scroll past the first or last item
			count = Math.max(Math.min(newCount, 0), -maxScroll);

			// Apply the translation
			schemeBtnBlock.style.transition = 'transform 0.3s ease-in-out';
			schemeBtnBlock.style.transform = `translateX(${count}px)`;

			isTransitioning = true;
			setTimeout(() => {
					updateButtonsState();
					isTransitioning = false;
			}, 300);
	};

	const handleClick = (e) => {
			const targ = e.target.closest('.scheme-nav__item, #nav-arrow-scheme_left, #nav-arrow-scheme_right');
			if (!targ) return;

			// Prevent further click events if touchend was handled
			if (e.type === 'touchend') {
				touchEventHandled = true;
			} else if (e.type === 'click' && touchEventHandled) {
				touchEventHandled = false;
				return;
			}

			if (targ.classList.contains('scheme-nav__item')) {
					// Handle tab switching
					schemeBtnList.forEach((btn, index) => {
							btn.classList.remove('active');
							schemeSliderSlides[index].style.display = 'none';
							schemeSliderDescrBlock[index].style.display = 'none';
							if (btn === targ) {
									btn.classList.add('active');
									schemeSliderSlides[index].style.display = 'block';
									schemeSliderDescrBlock[index].style.display = 'block';
							}
					});
			}

			if (targ === tabButtonsArrowLeft) {
					translate(1); // Scroll to the left
			}

			if (targ === tabButtonsArrowRight) {
					translate(-1); // Scroll to the right
			}
	};

	const handleResize = () => {
			count = 0;
			schemeBtnBlock.style.transform = `translateX(0px)`;
			updateButtonsState();
	};

	schemeId.addEventListener('click', handleClick);
	schemeId.addEventListener('touchend', handleClick);
	window.addEventListener('resize', handleResize);
	updateButtonsState();
};

export default howWeWorkTabs;
