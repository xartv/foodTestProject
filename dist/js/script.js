/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

  tabsWrapper.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // Timer

  let deadline = '2022-10-10';

  function calculateDifferenceOfDate(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = hours = minutes = seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / 1000 / 60 % 60);
      seconds = Math.floor(t / 1000 % 60);
    }

    return {
      t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
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

      if (t.t <= 0) {
        clearInterval(timerID);
      }

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
    }
  }

  setTimer('.timer', deadline); // Modal

  const modal = document.querySelector('.modal');
  const triggerButtons = document.querySelectorAll('[data-modal]'); //const modalTimerID = setTimeout(openModal, 20000);

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //clearInterval(modalTimerID);
  }

  function showModalByScroll() {
    let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);

    if (window.scrollY >= scrollHeight - document.documentElement.clientHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  triggerButtons.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });
  modal.addEventListener('click', e => {
    if (e.target.classList.contains('modal') || e.target.hasAttribute('data-close')) {
      closeModal();
    }
  });
  document.addEventListener('keyup', e => {
    if (!modal.classList.contains('hide') && e.code === 'Escape') {
      closeModal();
    }
  });
  window.addEventListener('scroll', showModalByScroll); // Classes

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

      if (this.classes.length == 0) {
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

  new MenuItem('img/tabs/vegy.jpg', "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 5, '.menu__field .container').render();
  new MenuItem("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем <br> не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - <br> ресторанное меню без похода в ресторан!  ', 10, '.menu__field .container', "menu__item").render();
  new MenuItem("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 8, '.menu__field .container', "menu__item").render(); // Sending forms to server

  const forms = document.querySelectorAll('form');
  const messages = {
    loading: 'img/svg/spinner.svg',
    success: 'Спасибо! Мы с вами скоро свяжемся',
    failure: 'Упс... Что-то пошло не так...'
  };
  forms.forEach(form => {
    sendData(form);
  });

  function sendData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const messageField = document.createElement('img');
      messageField.src = messages.loading;
      messageField.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
      form.insertAdjacentElement('afterend', messageField);
      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');
      const formData = new FormData(form);
      request.send(formData);
      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          messageField.remove();
          createMessage(messages.success);
          form.reset();
        } else {
          messageField.remove();
          createMessage(messages.failure);
        }
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
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map