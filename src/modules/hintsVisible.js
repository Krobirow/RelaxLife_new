const hintsVisible = () => {
	// problems hint block
	const ourProblemsHintBlock = document.getElementById('problems');
	const itemIconProblLinks = document.querySelectorAll('.problems-item__icon');
	const itemIconInners = document.querySelectorAll('.problems-item__icon-inner');

	let easyOpacity = 0;
	let animHint;

	ourProblemsHintBlock.addEventListener('mouseover', e => {
		let targ = e.target;

		if (targ.classList.contains('svg-wrap') || targ.classList.contains('svgItem') || targ.classList.contains('problems-item__icon-inner')) {
			targ = targ.closest('.problems-item__icon');
		} else {
			targ = e.target;
		}

		if(targ.classList.contains('problems-item__icon')) {
			// first remove all effects and next apply new one 
			easyOpacity = 0;
			itemIconProblLinks.forEach((item)=> {
				item.firstElementChild.style.opacity = 0;
			});
			itemIconInners.forEach((item)=> {
				item.classList.remove("active-item");
			});
			targ.firstElementChild.style.visibility = 'hidden';
			clearInterval(animHint);
			targ.parentNode.classList.remove('active-item');
			targ.lastElementChild.previousElementSibling.classList.remove('active-item');

			// now apply new effect
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
			itemIconInners.forEach((item)=> {
				item.classList.remove("active-item");
			});
			targ.firstElementChild.style.visibility = 'hidden';
			clearInterval(animHint);
			targ.parentNode.classList.remove('active-item');
			targ.lastElementChild.previousElementSibling.classList.remove('active-item');
		}
	});
};

export default hintsVisible;