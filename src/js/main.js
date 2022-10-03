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

	// Modal

	const modal = document.querySelector('.modal');
	const modalClose = modal.querySelector('[data-close]');
	const triggerButtons = document.querySelectorAll('[data-modal]');
	const modalTimerID = setTimeout(openModal, 20000);

	function closeModal() {
		modal.classList.toggle('hide');
		document.body.style.overflow = '';
	}

	function openModal() {
		modal.classList.toggle('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerID);
	}

	function showModalByScroll() {
		let scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);

		if(window.scrollY >= scrollHeight - document.documentElement.clientHeight ) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	triggerButtons.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
	
			openModal();
		});
	});
	
	modalClose.addEventListener('click', (e) => {
		e.preventDefault();

		closeModal();
	});

	modal.addEventListener('click', (e) => {
		e.preventDefault();

		if(e.target.classList.contains('modal')) {
			closeModal();
		}
	});

	document.addEventListener('keyup', (e) => {
		e.preventDefault();

		if(!modal.classList.contains('hide') && e.code === 'Escape') {
			closeModal();
		}
	});

	window.addEventListener('scroll', showModalByScroll);

	// Classes

	class MenuItem {
		constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
			this.img = img;
			this.alt = alt;
			this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parentSelector = parentSelector;
			this.transfer = 60;
			this.changeToRUB();
		}

		changeToRUB() {
			this.price *= this.transfer;
		}

		render() {
			let mainDiv = document.createElement('div');

			if(this.classes.length == 0) {
				this.classes.push("menu__item");
			}

			this.classes.forEach(item => {
				mainDiv.classList.add(item);
			});
			
			mainDiv.innerHTML = `
				<img src=${this.img} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.subtitle}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>`;
			
			const parent = document.querySelector(this.parentSelector);

			parent.append(mainDiv);
		}
	}

	new MenuItem(
		'img/tabs/vegy.jpg', 
		"vegy", 
		'Меню "Фитнес"', 
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
		5, 
		'.menu__field .container',
	).render();

	new MenuItem(
		"img/tabs/elite.jpg", 
		"elite", 
		'Меню “Премиум”', 
		'В меню “Премиум” мы используем <br> не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - <br> ресторанное меню без похода в ресторан!  ', 
		10, 
		'.menu__field .container',
		"menu__item",
	).render();

	new MenuItem(
		"img/tabs/post.jpg", 
		"post", 
		'Меню "Постное"', 
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
		8, 
		'.menu__field .container',
		"menu__item",
	).render();

});