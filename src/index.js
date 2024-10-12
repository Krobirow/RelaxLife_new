'use strict';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'remove-polyfill';
import 'eventlistener-polyfill';
import 'events-polyfill';
import 'scroll-into-view';

import burgerMenu from './modules/burgerMenu';
import pleasingScrollToLinks from './modules/pleasingScrollToLinks';
import showFullListServices from './modules/showFullListServices';
import maskPhone from './modules/maskPhone';
import modalPopUpPrivPolicy from './modules/modalPopUpPrivPolicy';
import hintsVisible from './modules/hintsVisible';
import commentSlider from './modules/commentSlider';
import portfolioTabsSliders from './modules/portfolioTabsSliders';
import howWeWorkTabs from './modules/howWeWorkTabs';
import popUpdesigneSlider from './modules/popUpdesigneSlider';
import accordeon from './modules/accordeon';
import UniversalCarousel from './modules/carousel';
import db from '..//db/db';
import repairPopUpDateBaseUpd from './modules/repairPopUpDateBaseUpd';
import fetchSenderForms from './modules/fetchSenderForms';

window.addEventListener('DOMContentLoaded', () => {
	maskPhone('#feedback-input1');
	maskPhone('#feedback-input2');
	maskPhone('#feedback-input5');
	maskPhone('#feedback-input6');
	burgerMenu();
	pleasingScrollToLinks();
	showFullListServices();
	modalPopUpPrivPolicy();
	hintsVisible();
	commentSlider();
	portfolioTabsSliders();
	howWeWorkTabs();
	popUpdesigneSlider();
	accordeon();
	repairPopUpDateBaseUpd(db);
	fetchSenderForms();

	const knownProblemsCarousel = new UniversalCarousel('.problems-carousel-wrapper', '.problems-carousel', '.problems-carousel__item', 1, 0, '.problems-carousel__arrowRight', '.problems-carousel__arrowLeft')
});
