function calc() {
	// create calc
	const resultField = document.querySelector('.calculating__result span');
	let sex = 'female';
	let activity = 1.375;
	let height, weight, age;

	
	getStaticInformation('.calculating__choose', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
	getVariableInformation('#height');
	getVariableInformation('#weight');
	getVariableInformation('#age');
	calcCalories();

	


	function calcCalories() {
		if(!sex || !height || !weight || !age || !activity) {
			resultField.innerHTML = '____';
			return;
		}
		
		if (sex == 'female') {
			resultField.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
		} else {
			resultField.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
		}

	}

	function getStaticInformation(parentSelector, activityClass) {
		const parent = document.querySelector(parentSelector);
		const elements = parent.querySelectorAll('div');

		parent.addEventListener('click', (e) => {
			const target = e.target;

			if(!target.dataset.ratio && !target.id || target.id == 'gender') {
				return;
			}

			if (target.dataset.ratio) {
				activity = target.dataset.ratio;
			}
			if (target.id == 'male' || target.id == 'female') {
				sex = target.id;
			}

				elements.forEach(elem => {
					elem.classList.remove(activityClass);
				});

				target.classList.add(activityClass);

				calcCalories();

				console.log(sex, height, weight, age, activity);
		});
	}
	
	function getVariableInformation(id) {
		const input = document.querySelector(id);

		input.addEventListener('input', (e) => {
			switch (id) {
				case '#height': 
					height = input.value;
					break;
				
				case '#weight': 
					weight = input.value;
					break;
				
				case '#age': 
					age = input.value;
					break;
			}

			calcCalories();
			console.log(sex, height, weight, age, activity);
		});
	}
}

module.exports = calc;