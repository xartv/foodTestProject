const data = [
  {
    img: "img/tabs/vegy.jpg",
    altimg: "vegy",
    title: "Меню 'Фитнес'",
    descr:
      "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    price: 9,
  },
  {
    img: "img/tabs/post.jpg",
    altimg: "post",
    title: "Меню 'Постное'",
    descr:
      "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    price: 14,
  },
  {
    img: "img/tabs/elite.jpg",
    altimg: "elite",
    title: "Меню 'Премиум'",
    descr:
      "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    price: 21,
  },
];

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
      let mainDiv = document.createElement("div");

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

  data.forEach(({ img, altimg, title, descr, price }) => {
    new MenuItem(
      img,
      altimg,
      title,
      descr,
      price,
      ".menu__field .container"
    ).render();
  });
}

export { cards };
