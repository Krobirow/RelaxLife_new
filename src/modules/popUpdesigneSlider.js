const popUpdesigneSlider = () => {
	const popupDesign = document.querySelector('.popup-design');

	// controls
	const popUpDesBtnContainer = document.getElementById('nav-list-popup-designs'),
		popUpDesBtnList = document.querySelectorAll('.designs-nav__item_popup'),
		sliderCountCurrent = document.getElementById('slideCountPopUpDesignCurrent'),
		sliderCountTotal = document.getElementById('slideCountPopUpDesignTotal');

	// slider elements
	const popUpdesignsSliderContainer = document.querySelector('.popup-design-slider');
	const popUpTextDescr = document.querySelectorAll('.popup-design-text');

	// all sliders inside wrapper
	const sliders = [
		document.querySelector('.popup-designs-slider__style1'),
		document.querySelector('.popup-designs-slider__style2'),
		document.querySelector('.popup-designs-slider__style3'),
		document.querySelector('.popup-designs-slider__style4'),
		document.querySelector('.popup-designs-slider__style5')
	];

	// Slider children for each style
	const sliderChildren = sliders.map(slider => [...slider.children]);

	let currentSliderIndex = 0;
	let currentSlideIndex = 0;
	let count = 0; // For horizontal tab scroll
	const stepSize = 180; // Adjust if necessary
	let touchEventHandled = false; // Flag to prevent double triggering

	// Reset body overflow when popup is closed
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

	// Handle window resize to reset tab position
	window.addEventListener('resize', () => {
		popUpDesBtnContainer.style.transform = 'translateX(0px)';
		count = 0;
	});

	// Translate the tabs horizontally in the popup
	const translateTabs = (direction) => {
		const maxScroll = popUpDesBtnContainer.scrollWidth - popUpDesBtnContainer.parentElement.offsetWidth;
		count += direction * stepSize;
		count = Math.max(Math.min(count, 0), -maxScroll);
		popUpDesBtnContainer.style.transform = `translateX(${count}px)`;
	};

	// Switch the visible slider and update the photo counter
	const switchSlider = (index) => {
		currentSliderIndex = index;
		currentSlideIndex = 0;

		// Hide all sliders and show the current one
		sliders.forEach((slider, i) => {
			slider.style.display = i === index ? 'block' : 'none';
			popUpDesBtnList[i].classList.toggle('active', i === index);
			popUpTextDescr[i].style.display = i === index ? 'block' : 'none';
		});

		// Update the slider counter
		sliderCountTotal.innerHTML = sliderChildren[index].length;
		sliderCountCurrent.innerHTML = 1;
	};

	// Navigate through the slides in the current slider
	const navigateSlide = (direction) => {
		const currentSliderChildren = sliderChildren[currentSliderIndex];
		const totalSlides = currentSliderChildren.length;

		// Adjust the current slide index
		currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;

		// Display the current slide and hide the others
		currentSliderChildren.forEach((slide, i) => {
			slide.style.display = i === currentSlideIndex ? 'block' : 'none';
		});

		// Update the slide counter
		sliderCountCurrent.innerHTML = currentSlideIndex + 1;
	};

	const handleEvent = (e) => {
		const target = e.target;

		// Prevent further click events if touchend was handled
		if (e.type === 'touchend') {
			touchEventHandled = true;
		} else if (e.type === 'click' && touchEventHandled) {
			touchEventHandled = false;
			return;
		}

		if (target.classList.contains('link-list-designs-btn')) {
			popupDesign.style.visibility = 'visible';
			stopScroll();
		}

		// Close popup when clicking on close button or outside the popup
		if (target.classList.contains('close') || target.classList.contains('popup-design')) {
			popupDesign.style.visibility = 'hidden';
			startScroll();
		}

		// Handle tab switching
		if (target.closest('.designs-nav__item_popup')) {
			const tabIndex = Array.from(popUpDesBtnList).indexOf(target.closest('.designs-nav__item_popup'));
			switchSlider(tabIndex);
		}

		// Handle tab scrolling with left/right arrows
		if (target.closest('#nav-arrow-popup-designs_left')) {
			translateTabs(1); // Scroll to the left
		}
		if (target.closest('#nav-arrow-popup-designs_right')) {
			translateTabs(-1); // Scroll to the right
		}

		// Handle slider navigation with left/right arrows
		if (target.closest('#popup_design_left')) {
			navigateSlide(-1); // Move to the previous slide
		}
		if (target.closest('#popup_design_right')) {
			navigateSlide(1); // Move to the next slide
		}
	}

	// Add event listener for popup interactions
	document.body.addEventListener('click', (e) => handleEvent(e));
	document.body.addEventListener('touchend', (e) => handleEvent(e));

	// Initialize the popup with the first tab active
	switchSlider(0);
};

export default popUpdesigneSlider;
