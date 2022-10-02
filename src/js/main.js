'use strict';

window.addEventListener('DOMContentLoaded', () => {

	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsWrapper = document.querySelector('.tabheader__items');

	hideTabContent();
	showTabContent();

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add('tabheader__item_active');
	}

	tabsWrapper.addEventListener('click', (e) => {
		e.preventDefault();

		let target = e.target;

		if(target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if(target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

	let deadline = '2022-10-10';

	function calculateDifferenceOfDate(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if(t <= 0) {
			days = hours = minutes = seconds = 0;
		} else {
				days = Math.floor((t / (1000 * 60 * 60 * 24)));
				hours = Math.floor((t / (1000 * 60 * 60) % 24));
				minutes = Math.floor((t /1000/60) % 60);
				seconds = Math.floor(((t / 1000) % 60));
		}

		return {
			t,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function getZero(num) {
		if(num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setTimer(selector, endtime) {
		const timer = document.querySelector(selector),
					days = timer.querySelector('#days'),
					hours = timer.querySelector('#hours'),
					minutes = timer.querySelector('#minutes'),
					seconds = timer.querySelector('#seconds'),
					timerID = setInterval(updateTimer, 1000);

		updateTimer();
					
		function updateTimer() {
			const t = calculateDifferenceOfDate(endtime);

			if(t.t <= 0) {
				clearInterval(timerID);
			}

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
		}
	}

	setTimer('.timer', deadline);
});