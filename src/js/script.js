'use strict';
import	{calc} from './modules/calc';
import	{cards} from './modules/cards';
import	{forms} from './modules/forms';
import	{modal, openModal} from './modules/modal';
import	{slider} from './modules/slider';
import	{tabs} from './modules/tabs';
import	{timer} from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
	const timerID = setTimeout(() => openModal('.modal' ,timerID), 5000);

	calc();
	cards();
	forms('form' ,timerID);
	modal('[data-modal]' ,timerID);
	slider({
		sliderContainer: '.offer__slider',
		slide: '.offer__slide',
		currentField: '#current',
		totalField: '#total',
		prevArr: '.offer__slider-prev',
		nextArr: '.offer__slider-next',
		outerWrapper: '.offer__slider-wrapper',
		innerWrapper: '.offer__slider-inner',
	});
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	timer('.timer', '2023-04-10');
});