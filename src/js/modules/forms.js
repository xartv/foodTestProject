import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, timerID) {
	// Sending forms to server
	const forms = document.querySelectorAll(formSelector);

	const messages = {
		loading: 'img/svg/spinner.svg',
		success: 'Спасибо! Мы с вами скоро свяжемся',
		failure: 'Упс... Что-то пошло не так...',
	};

	forms.forEach(form => {
		bindPostData(form);
	});

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

		openModal('.modal' ,timerID);
		modalContent.classList.add('hide');
		
		newModalContent.classList.add('modal__content');
		newModalContent.innerHTML = `
			<div data-close class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>
		`;
		document.querySelector('.modal__dialog').append(newModalContent);

		setTimeout(() => {
			closeModal('.modal');
			newModalContent.remove();
			modalContent.classList.remove('hide');
		}, 4000);
	}
}

export {forms};