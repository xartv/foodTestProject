function slider({
  sliderContainer,
  slide,
  nextArr,
  prevArr,
  totalField,
  currentField,
  outerWrapper,
  innerWrapper,
}) {
  // send selectors to func
  // create slider
  const slider = document.querySelector(sliderContainer);
  const slides = document.querySelectorAll(slide);
  const current = document.querySelector(currentField);
  const total = document.querySelector(totalField);
  const prevArrow = document.querySelector(prevArr);
  const nextArrow = document.querySelector(nextArr);
  const outer = document.querySelector(outerWrapper);
  const inner = document.querySelector(innerWrapper);
  const width = window.getComputedStyle(outer).width;
  let offset = 0;
  let currentSlideIndex = 1;

  total.innerHTML = slides.length < 10 ? `0${slides.length}` : slides.length;
  setCurrentSlideValue();

  inner.style.display = "flex";
  inner.style.transition = "0.5s All";
  outer.style.overflow = "hidden";
  inner.style.width = 100 * slides.length + "%";

  slides.forEach(slide => {
    slide.style.width = width;
  });

  nextArrow.addEventListener("click", () => {
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

    setCurrentSlideValue();

    removeClassFromElementOfCollection(dots, "active-dot");

    dots[currentSlideIndex - 1].classList.add("active-dot");
  });

  prevArrow.addEventListener("click", () => {
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

    setCurrentSlideValue();

    removeClassFromElementOfCollection(dots, "active-dot");

    dots[currentSlideIndex - 1].classList.add("active-dot");
  });

  // create dots
  const dotsWrapper = document.createElement("ol");
  dotsWrapper.classList.add("carousel-indicators");

  slider.style.position = "relative";
  slider.append(dotsWrapper);

  for (let i = 0; i < slides.length; i++) {
    dotsWrapper.innerHTML += `<li class="dot" data-slider="${i + 1}"></li>`;
  }

  const dots = document.querySelectorAll(".dot");

  dots[currentSlideIndex - 1].classList.add("active-dot");

  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      const target = e.target;

      removeClassFromElementOfCollection(dots, "active-dot");

      e.target.classList.add("active-dot");

      offset = (target.dataset.slider - 1) * parseInt(width);

      inner.style.transform = `translateX(-${offset}px)`;

      currentSlideIndex = +target.dataset.slider;

      setCurrentSlideValue();
    });
  });

  function setCurrentSlideValue() {
    current.innerHTML =
      slides.length < 10 ? `0${currentSlideIndex}` : currentSlideIndex;
  }

  function removeClassFromElementOfCollection(collection, className) {
    collection.forEach(item => {
      item.classList.remove(className);
    });
  }
}

export { slider };
