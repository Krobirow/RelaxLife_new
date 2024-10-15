const designerSolutTabsSliders = () => {
	const designsContainer = document.getElementById('designs');
	const designsBtnContainer = document.getElementById('designs-list');
	const designsBtnList = document.querySelectorAll('.designs-nav__item');

	const sliderCountTotal = document.getElementById('slideCountDesignTotal');
	const sliderCountCurrent = document.getElementById('slideCountDesignCurrent');

	const tabsArrLeft = document.getElementById('nav-arrow-designs_left');
	const tabsArrRight = document.getElementById('nav-arrow-designs_right');

	const sliders = [
		document.querySelector('.designs-slider__style1'),
		document.querySelector('.designs-slider__style2'),
		document.querySelector('.designs-slider__style3'),
		document.querySelector('.designs-slider__style4'),
		document.querySelector('.designs-slider__style5')
	];

	let currentSliderIndex = 0;
	let currentSlideIndex = 0;
	let count = 0;
	const stepSize = 200; // Adjust scrolling step based on how much space to scroll per click
	let touchEventHandled = false; // Flag to prevent double triggering

	const getSliderBounds = () => designsBtnContainer.getBoundingClientRect();
	const getTabBounds = (index) => designsBtnList[index].getBoundingClientRect();
	const getTotalWidth = () => designsBtnContainer.scrollWidth;
	const getVisibleWidth = () => designsBtnContainer.parentElement.offsetWidth;

	const updateButtonsState = () => {
		const firstTabBounds = getTabBounds(0);
		const lastTabBounds = getTabBounds(designsBtnList.length - 1);
		const sliderBounds = getSliderBounds();

		// Disable left arrow if the first tab is fully visible
		tabsArrLeft.disabled = (firstTabBounds.left - 20) >= sliderBounds.left;
		// Disable right arrow if the last tab is fully visible
		tabsArrRight.disabled = (lastTabBounds.right + 20) <= sliderBounds.right;
	};

	const translate = (direction) => {
		const totalWidth = getTotalWidth();
		const visibleWidth = getVisibleWidth();

		// Calculate new scroll position
		const newCount = count + direction * stepSize;
		const maxScroll = totalWidth - visibleWidth;

		// Restrict scrolling within boundaries
		count = Math.max(Math.min(newCount, 0), -maxScroll);

		// Apply the translation
		designsBtnContainer.style.transition = 'transform 0.3s ease-in-out';
		designsBtnContainer.style.transform = `translateX(${count}px)`;

		updateButtonsState();
	};

	const handleTabSwitch = (index) => {
		currentSliderIndex = index;
		currentSlideIndex = 0;

		// Reset all tabs and sliders
		designsBtnList.forEach((btn, i) => {
			btn.classList.remove('active');
			sliders[i].style.display = 'none';
		});

		// Activate the selected tab and corresponding slider
		designsBtnList[index].classList.add('active');
		sliders[index].style.display = 'block';

		// Update the counter for the current slider
		sliderCountTotal.innerHTML = sliders[index].children.length;
		sliderCountCurrent.innerHTML = 1;
	};

	const updateSlide = (direction) => {
		const currentSlider = sliders[currentSliderIndex];
		const totalSlides = currentSlider.children.length;

		// Adjust current slide index based on direction (left or right)
		currentSlideIndex += direction;

		if (currentSlideIndex < 0) {
			currentSlideIndex = totalSlides - 1; // Loop back to the last slide
		} else if (currentSlideIndex >= totalSlides) {
			currentSlideIndex = 0; // Loop back to the first slide
		}

		// Update the visible slide
		Array.from(currentSlider.children).forEach((slide, i) => {
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

		// Handle tab switching
		if (target.closest('.designs-nav__item')) {
			const tabIndex = Array.from(designsBtnList).indexOf(target.closest('.designs-nav__item'));
			handleTabSwitch(tabIndex);
		}

		// Handle slider navigation (left and right arrows)
		if (target.closest('#design_left')) {
			updateSlide(-1); // Move to the previous slide
		} else if (target.closest('#design_right')) {
			updateSlide(1); // Move to the next slide
		}

		// Handle tab scrolling with arrows
		if (target.closest('#nav-arrow-designs_left')) {
			translate(1); // Scroll to the left
		} else if (target.closest('#nav-arrow-designs_right')) {
			translate(-1); // Scroll to the right
		}
	} 

	designsContainer.addEventListener('click', (e) => handleEvent(e));
	designsContainer.addEventListener('touchend', (e) => handleEvent(e));

	window.addEventListener('resize', () => {
		count = 0;
		designsBtnContainer.style.transform = `translateX(0px)`;
		updateButtonsState();
	});

	// Initial state update for buttons
	updateButtonsState();

	// Initialize with the first tab active
	handleTabSwitch(0);
};

export default designerSolutTabsSliders;
