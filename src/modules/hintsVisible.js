const hintsVisible = () => {
	// formula hint block
	const ourFormulaHint = document.getElementById('formula');
	let ourItenIconsLinks = document.querySelectorAll('.formula-item__icon');
	
	// problems hint block
	const ourProblemsHintBlock = document.getElementById('problems');
	const svgWrapProbl = document.querySelectorAll('.svg-wrap');
	const itemIconProblLinks = document.querySelectorAll('.problems-item__icon');


	// technical variables
	let ourWidth = window.innerWidth;
	let easyOpacity = 0;
	let animHint;
	let num;

	window.addEventListener('resize', event => {
		ourWidth = event.target.innerWidth;
	});

	ourFormulaHint.addEventListener('mouseover', e => {
		let targ = e.target;

		if (targ === null || targ.classList.contains('formula-item__icon-inner') || targ.classList.contains('formula-item__icon-inner-text')) {
			targ = targ.closest('.formula-item__icon');
		} else {
			targ = e.target;
		}

		if (targ.classList.contains('formula-item__icon')) {
			let position = targ.getBoundingClientRect();

			targ.classList.add('active-item');

			function createStyle(name,rules){
				const style = document.createElement('style');
				style.type = 'text/css';
				targ.parentNode.appendChild(style);
				if(!(style.sheet||{}).insertRule) {
					(style.styleSheet || style.sheet).addRule(name, rules);
				} else {
					style.sheet.insertRule(name+"{"+rules+"}",0); 
				}
			}
			
			if (targ.firstElementChild.classList.contains('formula-item-popup-01')) {
				num = '01';
			} else if (targ.firstElementChild.classList.contains('formula-item-popup-02')) {
				num = '02';
			} else if (targ.firstElementChild.classList.contains('formula-item-popup-03')) {
				num = '03';
			} else if (targ.firstElementChild.classList.contains('formula-item-popup-04')) {
				num = '04';
			} else if (targ.firstElementChild.classList.contains('formula-item-popup-05')) {
				num = '05';
			} else if (targ.firstElementChild.classList.contains('formula-item-popup-06')) {
				num = '06';
			}

			if (position.y < 162 && targ.firstElementChild.classList.contains(`formula-item-popup-${num}`)) {
				createStyle(`.formula-item-popup-${num}:before`,"transform: rotate(-180deg);");
				targ.firstElementChild.style.bottom = '-190px';
				let onlyTwoStyle = targ.parentNode.querySelectorAll('style');
				if (onlyTwoStyle.length > 1) {
					targ.parentNode.lastElementChild.previousElementSibling.remove();
				}
			}
			if (position.y > 162 && targ.firstElementChild.classList.contains(`formula-item-popup-${num}`) && ourWidth > 1000) {
				createStyle(`.formula-item-popup-${num}:before`,"transform: rotate(360deg);");
				targ.firstElementChild.style.bottom = '90px';
				let onlyTwoStyle = targ.parentNode.querySelectorAll('style');
				if (onlyTwoStyle.length > 1) {
					targ.parentNode.lastElementChild.previousElementSibling.remove();
				}
			}

			targ.firstElementChild.style.visibility = 'visible';

			animHint = setInterval ( () => {
				easyOpacity = easyOpacity + 0.1;

				if(easyOpacity < 1) {
					targ.firstElementChild.style.opacity = easyOpacity;
				} else
				if(easyOpacity >= 1.1) {
					targ.firstElementChild.style.opacity = 1;
					clearInterval(animHint);
				}
			}, 100);
		} 

		if (targ.classList.contains('formula-slider__slide')) {
			targ.firstElementChild.firstElementChild.style.visibility = 'visible';
			animHint = setInterval ( () => {
				easyOpacity = easyOpacity + 0.1;

				if(easyOpacity < 1) {
					targ.firstElementChild.firstElementChild.style.opacity = easyOpacity;
				} else
				if(easyOpacity >= 1.1) {
					targ.firstElementChild.firstElementChild.style.opacity = 1;
					clearInterval(animHint);
				}
			}, 100);
		}
	});

	ourFormulaHint.addEventListener('mouseout', e => {
		
		let targ = e.target;

		if (targ === null || targ.classList.contains('formula-item__icon-inner') || targ.classList.contains('formula-item__icon-inner-text')) {
			targ = targ.closest('.formula-item__icon');
		} else {
			targ = e.target;
		}

		if (targ.classList.contains('formula-item__icon')) {
			easyOpacity = 0;
			ourItenIconsLinks.forEach((item)=> {
				item.firstElementChild.style.opacity = 0;
			});
			targ.firstElementChild.style.visibility = 'hidden';
			clearInterval(animHint);

			targ.classList.remove('active-item');
			
		}

		if (targ.classList.contains('formula-slider__slide')) {
			easyOpacity = 0;
			targ.firstElementChild.firstElementChild.style.opacity = 0;
			targ.firstElementChild.firstElementChild.style.visibility = 'hidden';
			clearInterval(animHint);
		}
	});

	ourProblemsHintBlock.addEventListener('mouseover', e => {
		let targ = e.target;

		if (targ.classList.contains('svg-wrap') || targ.classList.contains('svgItem') || targ.classList.contains('problems-item__icon-inner')) {
			targ = targ.closest('.problems-item__icon');
		} else {
			targ = e.target;
		}

		if(targ.classList.contains('problems-item__icon')) {
			targ.parentNode.classList.add('active-item');
			targ.lastElementChild.previousElementSibling.classList.add('active-item');

			targ.firstElementChild.style.visibility = 'visible';

			animHint = setInterval ( () => {
				easyOpacity = easyOpacity + 0.1;

				if(easyOpacity < 1) {
					targ.firstElementChild.style.opacity = easyOpacity;
				} else
				if(easyOpacity >= 1) {
					targ.firstElementChild.style.opacity = 1;
					clearInterval(animHint);
				}
			}, 100);
		}
	});

	ourProblemsHintBlock.addEventListener('mouseout', e => {
		let targ = e.target;
		
		if (targ.classList.contains('svg-wrap') || targ.classList.contains('svgItem') || targ.classList.contains('problems-item__icon-inner')) {
			targ = targ.closest('.problems-item__icon');
		} else {
			targ = e.target;
		}

		if (targ.classList.contains('problems-item__icon')) {
			easyOpacity = 0;
			itemIconProblLinks.forEach((item)=> {
				item.firstElementChild.style.opacity = 0;
			});
			targ.firstElementChild.style.visibility = 'hidden';
			clearInterval(animHint);
			targ.parentNode.classList.remove('active-item');
			targ.lastElementChild.previousElementSibling.classList.remove('active-item');
		}
	});
};

export default hintsVisible;