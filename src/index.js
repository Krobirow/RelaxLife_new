'use strict';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'remove-polyfill';
import 'eventlistener-polyfill';
import 'events-polyfill';
import 'scroll-into-view';

import visibleTelList from './modules/visibleTelList';
import burgerMenu from './modules/burgerMenu';
import pleasingScrollToLinks from './modules/pleasingScrollToLinks';
import showFullListServices from './modules/showFullListServices';
import maskPhone from './modules/maskPhone';
import modalPopUpPrivPolicy from './modules/modalPopUpPrivPolicy';
import hintsVisible from './modules/hintsVisible';
import sliderDocuments from './modules/sliderDocuments';
import repairSlaider from './modules/repairSlaider';
import commentSlider from './modules/commentSlider';
import designerSolutTabsSliders from './modules/designerSolutTabsSliders';
import howWeWorkTabs from './modules/howWeWorkTabs';
import popUpdesigneSlider from './modules/popUpdesigneSlider';
import accordeon from './modules/accordeon';
import UniversalCarousel from './modules/carousel';
import portfolioSlider from './modules/portfolioSlider';
import portfolioPopUpSlider from './modules/portfolioPopUpSlider';
import db from '..//db/db';
import repairPopUpDateBaseUpd from './modules/repairPopUpDateBaseUpd';
import fetchSenderForms from './modules/fetchSenderForms';

window.addEventListener('DOMContentLoaded', () => {
	maskPhone('#feedback-input1');
	maskPhone('#feedback-input2');
	maskPhone('#feedback-input3');
	maskPhone('#feedback-input4');
	maskPhone('#feedback-input5');
	maskPhone('#feedback-input6');
	visibleTelList();
	burgerMenu();
	pleasingScrollToLinks();
	showFullListServices();
	modalPopUpPrivPolicy();
	hintsVisible();
	sliderDocuments();
	repairSlaider();
	commentSlider();
	designerSolutTabsSliders();
	howWeWorkTabs();
	popUpdesigneSlider();
	accordeon();
	portfolioSlider();
	portfolioPopUpSlider();
	repairPopUpDateBaseUpd(db);
	fetchSenderForms();


	const repairTypesTabsCarousel = new UniversalCarousel('.repair-types-carousel-wrapper', '.repair-types-carousel', '.repair-types-carousel__item', 3, 0, '.repair-types-carousel__arrowRight', '.repair-types-carousel__arrowLeft');
	const formulaOfSuccessCarousel = new UniversalCarousel('.formula-carousel-wrapper', '.formula-carousel', '.formula-carousel__slide', 1, 0, '.formula-carousel__arrowRight', '.formula-carousel__arrowLeft');
	const knownProblemsCarousel = new UniversalCarousel('.problems-carousel-wrapper', '.problems-carousel', '.problems-carousel__item', 1, 0, '.problems-carousel__arrowRight', '.problems-carousel__arrowLeft')
	const partnersCarousel = new UniversalCarousel('.partners-carousel-wrapper', '.partners-carousel', '.partners-carousel__slide', 3, 0, '.partners-carousel__arrowRight', '.partners-carousel__arrowLeft');
	

});
