const commentSlider = () => {
    const sliderSlides = document.querySelectorAll('.reviews-slider__slide');
    const sliderNext = document.getElementById('reviews-arrow_left');
    const sliderPrev = document.getElementById('reviews-arrow_right');

    let count = 0;
    
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
    
    document.addEventListener('click', e => {
        let targ = e.target;

        if (targ === sliderNext || targ === sliderNext.firstElementChild) {
            count--;
            if (count < 0) {
                count = sliderSlides.length - 1;
            }
            renderSlides(count, sliderSlides)
        }
        if (targ === sliderPrev || targ === sliderPrev.firstElementChild) {
            count++;
            if (count === sliderSlides.length) {
                count = 0;
            }
            renderSlides(count, sliderSlides)
        }
    });
}

export default commentSlider;