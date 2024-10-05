
export default class UniversalCarousel {
	constructor(carousel, carouselContent, slides, carouselDisplaying = 3, lengthOfSlide = 0, rightNav, leftNav) {
		this.carousel = document.querySelector(carousel);
		this.carouselContent = document.querySelector(carouselContent);
		this.slides = document.querySelectorAll(slides);
		this.arrayOfSlides = Array.prototype.slice.call(this.slides);
		this.carouselDisplaying = carouselDisplaying;
		this.lengthOfSlide = lengthOfSlide;
		this.rightNav =  document.querySelector(rightNav);
		this.leftNav =  document.querySelector(leftNav);
		this.newSlides = slides;
		this.setScreenSize();
		this.moving = true;
		this.initialX = 0;
		this.initialPos = [];
		this.init();
	}

	init() {
		this.moveSlidesRight();
		window.addEventListener('resize', this.setScreenSize.bind(this));
		this.rightNav.addEventListener('click', this.moveLeft.bind(this));
		this.leftNav.addEventListener('click', this.moveRight.bind(this));
		this.carouselContent.addEventListener('mousedown', this.seeMovement.bind(this));

		this.activateAgainBinded  = this.activateAgain.bind(this);
		this.replaceToEndBinded = this.replaceToEnd.bind(this);
		this.moveBasedOnMouseBinded = this.moveBasedOnMouse.bind(this);
		this.slightMoveBinded = this.slightMove.bind(this);
	}

	addClone() {
		let lastSlide = this.carouselContent.lastElementChild.cloneNode(true);
		lastSlide.style.left = (-this.lengthOfSlide) + "px";
		this.carouselContent.insertBefore(lastSlide, this.carouselContent.firstChild);
	}

	removeClone() {
		let firstSlide = this.carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
	}

	moveSlidesRight() {
		this.slides = document.querySelectorAll(`${this.newSlides}`);
		let slidesArray = Array.prototype.slice.call(this.slides);
		let width = 0;

		slidesArray.forEach((el, i) => {
			el.style.left = width + "px";
			width += this.lengthOfSlide;
		});
		this.addClone();
	}

	moveSlidesLeft() {
		this.slides = document.querySelectorAll(`${this.newSlides}`);
		let slidesArray = Array.prototype.slice.call(this.slides);
		slidesArray = slidesArray.reverse();
		let maxWidth = (slidesArray.length - 1) * this.lengthOfSlide;

		slidesArray.forEach((el, i) => {
			maxWidth -= this.lengthOfSlide;
			el.style.left = maxWidth + "px";
		});
	}

	setScreenSize() {
		if (window.innerWidth <= 768) {
			this.carouselDisplaying = 1;
		}
		this.getScreenSize();
	}

	getScreenSize() {
		// this.slides = document.querySelectorAll(`${this.newSlides}`);
		let slidesArray = Array.prototype.slice.call(this.slides);
		this.lengthOfSlide = (this.carousel.offsetWidth  / this.carouselDisplaying);
		let initialWidth = -this.lengthOfSlide;
		slidesArray.forEach(el => {
			el.style.width = this.lengthOfSlide + "px";
			el.style.left = initialWidth + "px";
			initialWidth += this.lengthOfSlide;
		});
	}

	moveRight() {
		if (this.moving) {
			this.moving = false;
			let lastSlide = this.carouselContent.lastElementChild;
			lastSlide.parentNode.removeChild(lastSlide);
			this.carouselContent.insertBefore(lastSlide, this.carouselContent.firstChild);
			this.removeClone();
			let firstSlide = this.carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', this.activateAgainBinded);
			this.moveSlidesRight();
		}
	}

	activateAgain() {
		let firstSlide = this.carouselContent.firstElementChild;
		this.moving = true;
		firstSlide.removeEventListener('transitionend', this.activateAgainBinded);
	}

	moveLeft() {
		if (this.moving) {
			this.moving = false;
			this.removeClone();
			let firstSlide = this.carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', this.replaceToEndBinded);
			this.moveSlidesLeft();
		}
	}

	replaceToEnd() {
		let firstSlide = this.carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
		this.carouselContent.appendChild(firstSlide);
		firstSlide.style.left = ((this.arrayOfSlides.length - 1) * this.lengthOfSlide) + "px";
		this.addClone();
		this.moving = true;
		firstSlide.removeEventListener('transitionend', this.replaceToEndBinded);
	}

	seeMovement(event) {
		this.initialX = event.clientX;
		this.getInitialPos();
		this.carouselContent.addEventListener('mousemove', this.slightMoveBinded);
		document.addEventListener('mouseup', this.moveBasedOnMouseBinded);
	}

	slightMove(event) {
		if (this.moving) {
			let movingX = event.clientX;
			let difference = this.initialX - movingX;
			if (Math.abs(difference) < (this.lengthOfSlide / 4)) {
				this.slightMoveSlides(difference);
			}
		}
	}

	getInitialPos() {
		// this.slides = document.querySelectorAll(`${this.newSlides}`);
		let slidesArray = Array.prototype.slice.call(this.slides);
		slidesArray.forEach(el => {
			let left = Math.floor(parseInt(el.style.left.slice(0, -2)));
			this.initialPos.push(left);
		});
	}

	slightMoveSlides(newX) {
		let slidesArray = Array.prototype.slice.call(this.slides);
		slidesArray.forEach((el, i) => {
			let oldLeft = this.initialPos[i];
			el.style.left = (oldLeft + newX) + "px";
		});
	}

	moveBasedOnMouse(event) {
		let finalX = event.clientX;
		if (this.initialX - finalX > 0) {
			this.moveRight.call(this);
		} else if (this.initialX - finalX < 0) {
			this.moveLeft.call(this);
		}
		document.removeEventListener('mouseup', this.moveBasedOnMouseBinded);
		this.carouselContent.removeEventListener('mousemove',  this.slightMoveBinded);
	}
}