const dotsCarousel = () => {
	let carousel = document.querySelector('.formula-slider-wrap');
	let carouselContent = document.querySelector('.formula-slider');
	let slides = document.querySelectorAll('.formula-slider__slide');
	let arrayOfSlides = Array.prototype.slice.call(slides);
	let carouselDisplaying;
	let screenSize;
	setScreenSize();
	let lengthOfSlide;

	function addClone() {
		let lastSlide = carouselContent.lastElementChild.cloneNode(true);
		lastSlide.style.left = (-lengthOfSlide) + "px";
		carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
	}
	// addClone();

	function removeClone() {
		let firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
	}

	function moveSlidesRight() {
		let slides = document.querySelectorAll('.formula-slider__slide');
		let slidesArray = Array.prototype.slice.call(slides);
		let width = 0;

		slidesArray.forEach((el, i) => {
			el.style.left = width + "px";
			width += lengthOfSlide;
		});
		addClone();
	}
	moveSlidesRight();

	function moveSlidesLeft() {
		let slides = document.querySelectorAll('.formula-slider__slide');
		let slidesArray = Array.prototype.slice.call(slides);
		slidesArray = slidesArray.reverse();
		let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

		slidesArray.forEach((el, i) => {
			maxWidth -= lengthOfSlide;
			el.style.left = maxWidth + "px";
		});
	}

	window.addEventListener('resize', setScreenSize);

	function setScreenSize() {
		if (window.innerWidth >= 500) {
			carouselDisplaying = 1;
		} else if (window.innerWidth >= 300) {
			carouselDisplaying = 1;
		} else {
			carouselDisplaying = 1;
		}
		getScreenSize();
	}

	function getScreenSize() {
		let slides = document.querySelectorAll('.formula-slider__slide');
		let slidesArray = Array.prototype.slice.call(slides);
		lengthOfSlide = (carousel.offsetWidth  / carouselDisplaying);
		let initialWidth = -lengthOfSlide;
		slidesArray.forEach(el => {
			el.style.width = lengthOfSlide + "px";
			el.style.left = initialWidth + "px";
			initialWidth += lengthOfSlide;
		});
	}

	let rightNav = document.querySelector('#formula-arrow_right');
	console.log();
	rightNav.addEventListener('click', moveLeft);

	let moving = true;
	function moveRight() {
		if (moving) {
			moving = false;
			let lastSlide = carouselContent.lastElementChild;
			lastSlide.parentNode.removeChild(lastSlide);
			carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
			removeClone();
			let firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', activateAgain);
			moveSlidesRight();
		}
	}

	function activateAgain() {
		let firstSlide = carouselContent.firstElementChild;
		moving = true;
		firstSlide.removeEventListener('transitionend', activateAgain);
	}

	let leftNav = document.querySelector('#formula-arrow_left');
	leftNav.addEventListener('click', moveRight);

	// let moveLeftAgain = true;
	function moveLeft() {
		if (moving) {
			moving = false;
			removeClone();
			let firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', replaceToEnd);
			moveSlidesLeft();
		}
	}

	function replaceToEnd() {
		let firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
		carouselContent.appendChild(firstSlide);
		firstSlide.style.left = ((arrayOfSlides.length - 1) * lengthOfSlide) + "px";
		addClone();
		moving = true;
		firstSlide.removeEventListener('transitionend', replaceToEnd);
	}

	carouselContent.addEventListener('mousedown', seeMovement);

	let initialX;
	let initialPos;
	function seeMovement(e) {
		initialX = e.clientX;
		getInitialPos();
		carouselContent.addEventListener('mousemove', slightMove);
		document.addEventListener('mouseup', moveBasedOnMouse);
	}

	function slightMove(e) {
		if (moving) {
			let movingX = e.clientX;
			let difference = initialX - movingX;
			if (Math.abs(difference) < (lengthOfSlide / 4)) {
				slightMoveSlides(difference);
			}
		}
	}

	function getInitialPos() {
		let slides = document.querySelectorAll('.slide');
		let slidesArray = Array.prototype.slice.call(slides);
		initialPos = [];
		slidesArray.forEach(el => {
			let left = Math.floor(parseInt(el.style.left.slice(0, -2)));
			initialPos.push(left);
		});
	}

	function slightMoveSlides(newX) {
		let slides = document.querySelectorAll('.slide');
		let slidesArray = Array.prototype.slice.call(slides);
		slidesArray.forEach((el, i) => {
			let oldLeft = initialPos[i];
			el.style.left = (oldLeft + newX) + "px";
		});
	}

	function moveBasedOnMouse(e) {
		let finalX = e.clientX;
		if (initialX - finalX > 0) {
			moveRight();
		} else if (initialX - finalX < 0) {
			moveLeft();
		}
		document.removeEventListener('mouseup', moveBasedOnMouse);
		carouselContent.removeEventListener('mousemove', slightMove);
	}
};

export default dotsCarousel;