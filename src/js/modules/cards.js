import axios from "axios";

function cards() {
	// Cards
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

	axios.get('http://localhost:3000/menu')
	.then(data => {
		data.data.forEach(({img, altimg, title, descr, price}) => {
			new MenuItem(img, altimg, title, descr, price, '.menu__field .container').render();
		});
	});
}

export {cards};