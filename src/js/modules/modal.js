function modal() {
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
}

module.exports = modal;