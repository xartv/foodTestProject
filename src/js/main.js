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
	const triggerButtons = document.querySelectorAll('[data-modal]');
	//const modalTimerID = setTimeout(openModal, 20000);

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		//clearInterval(modalTimerID);
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
	
	modal.addEventListener('click', (e) => {	
		if(e.target.classList.contains('modal') || e.target.hasAttribute('data-close')) {
			closeModal();
		}
	});

	document.addEventListener('keyup', (e) => {
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

	const getData = async (url) => {
		const res = await fetch(url);
		
		return await res.json();
	};

	// запрос через fetch
	//getData('http://localhost:3000/menu')
	//.then((data) => {
	//	data.forEach(({img, altimg, title, descr, price}) => {
	//		new MenuItem(img, altimg, title, descr, price, '.menu__field .container').render();
	//	});
	//});

	// запрос через axios
	axios.get('http://localhost:3000/menu')
	.then(data => {
		data.data.forEach(({img, altimg, title, descr, price}) => {
			new MenuItem(img, altimg, title, descr, price, '.menu__field .container').render();
		});
	});

	// Sending forms to server

	const forms = document.querySelectorAll('form');

	const messages = {
		loading: 'img/svg/spinner.svg',
		success: 'Спасибо! Мы с вами скоро свяжемся',
		failure: 'Упс... Что-то пошло не так...',
	};

	forms.forEach(form => {
		bindPostData(form);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: data,
		});
		
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const messageField = document.createElement('img');
			messageField.src = messages.loading;
			messageField.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend' ,messageField);

			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			
			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				messageField.remove();
				createMessage(messages.success);
			})
			.catch(() => {
				createMessage(messages.failure);
			})
			.finally(() => {
				form.reset();
			});
		});
	}

	function createMessage(message) {
		const modalContent = document.querySelector('.modal__content');
		const newModalContent = document.createElement('div');

		openModal();
		modalContent.classList.add('hide');
		
		newModalContent.classList.add('modal__content');
		newModalContent.innerHTML = `
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		`;
		document.querySelector('.modal__dialog').append(newModalContent);

		setTimeout(() => {
			closeModal();
			newModalContent.remove();
			modalContent.classList.remove('hide');
		}, 4000);
	}

	// creating sliders v1
 
	//const slides = document.querySelectorAll('.offer__slide');
	//const currentIndex = document.querySelector('#current');
	//const totalIndex = document.querySelector('#total');
	//const prevArrow = document.querySelector('.offer__slider-prev');
	//const nextArrow = document.querySelector('.offer__slider-next');
	//let currentSlideIndex;
	
	//showSlide();

	//function showSlide() { 
	//	totalIndex.innerHTML = slides.length < 10 ? `0${slides.length}` : slides.length;

	//	slides.forEach((item, index) => {
	//		if (!item.classList.contains('hide')) {
	//			currentSlideIndex = index;
	//			currentIndex.innerHTML = slides.length < 10 ? `0${index + 1}` : index;
	//		}
	//	});
	//}
	
	//function changeSlide(prevSlide, nextSlide) {
	//	if (prevSlide) {
	//		slides.forEach((item, index) => {
	//			if(item.previousElementSibling && index == currentSlideIndex) {
	//				item.previousElementSibling.classList.add('show');
	//				item.previousElementSibling.classList.remove('hide');

	//				item.classList.remove('show');
	//				item.classList.add('hide');
	//			}
	//		});
	//	}

	//	if (nextSlide) {
	//		slides.forEach((item, index) => {
	//			if(item.nextElementSibling && index == currentSlideIndex) {
	//				item.nextElementSibling.classList.add('show');
	//				item.nextElementSibling.classList.remove('hide');

	//				item.classList.remove('show');
	//				item.classList.add('hide');
	//			}
	//		});
	//	}

	//	showSlide();
	//}	

	//prevArrow.addEventListener('click', (e) => {
	//	changeSlide(true, false);
	//});

	//nextArrow.addEventListener('click', (e) => {
	//	changeSlide(false, true);
	//});

	
	// creating slider v2

	//const slides = document.querySelectorAll('.offer__slide');
	//const current = document.querySelector('#current');
	//const total = document.querySelector('#total');
	//const prevArrow = document.querySelector('.offer__slider-prev');
	//const nextArrow = document.querySelector('.offer__slider-next');
	//let currentSlideIndex = 1;

	//showSlides(currentSlideIndex);

	//total.innerHTML = slides.length < 10 ? `0${slides.length}` : slides.length;

	//function showSlides(n) {
	//	if (n < 1) {
	//		currentSlideIndex = slides.length;
	//	}  

	//	if (n > slides.length) {
	//		currentSlideIndex = 1;
	//	}
		
	//	slides.forEach(item => {
	//		item.classList.remove('show');
	//		item.classList.add('hide');
	//	});

	//	slides[currentSlideIndex - 1].classList.remove('hide');
	//	slides[currentSlideIndex - 1].classList.add('show');

	//	current.innerHTML = slides.length < 10 ? `0${currentSlideIndex}` : currentSlideIndex;
	//}

	//function changeSlide(n) {
	//	showSlides(currentSlideIndex += n);
	//}

	//prevArrow.addEventListener('click', () => {
	//	changeSlide(-1);
	//});

	//nextArrow.addEventListener('click', () => {
	//	changeSlide(1);
	//});


	// creat slider

	const slides = document.querySelectorAll('.offer__slide');
	const current = document.querySelector('#current');
	const total = document.querySelector('#total');
	const prevArrow = document.querySelector('.offer__slider-prev');
	const nextArrow = document.querySelector('.offer__slider-next');
	const outer = document.querySelector('.offer__slider-wrapper');
	const inner = document.querySelector('.offer__slider-inner');
	const width = window.getComputedStyle(outer).width;
	let offset = 0;
	let currentSlideIndex = 1;

	total.innerHTML = slides.length < 10 ? `0${slides.length}` : slides.length;
	current.innerHTML = slides.length < 10 ? `0${currentSlideIndex}` : currentSlideIndex;

	inner.style.display = 'flex';
	inner.style.transition = '0.5s All';
	outer.style.overflow = 'hidden';
	inner.style.width = 100 * slides.length + '%';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	nextArrow.addEventListener('click', () => {
		if (offset == parseInt(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += parseInt(width); 
		}

		inner.style.transform = `translateX(-${offset}px)`;

		if (currentSlideIndex == slides.length) {
			currentSlideIndex = 1;
		} else {
			currentSlideIndex++;
		}
	
		current.innerHTML = slides.length < 10 ? `0${currentSlideIndex}` : currentSlideIndex;
	});

	prevArrow.addEventListener('click', () => {
		if (offset == 0) {
			offset = parseInt(width) * (slides.length - 1);
		} else {
			offset -= parseInt(width); 
		}

		inner.style.transform = `translateX(-${offset}px)`;

		if (currentSlideIndex == 1) {
			currentSlideIndex = slides.length;
		} else {
			currentSlideIndex--;
		}

		current.innerHTML = slides.length < 10 ? `0${currentSlideIndex}` : currentSlideIndex;
	});
});