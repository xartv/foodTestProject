function closeModal(containerSelector) {
  document.querySelector(containerSelector).classList.add("hide");
  document.querySelector(containerSelector).classList.remove("show");
  document.body.style.overflow = "";
}

function openModal(containerSelector, timerID) {
  document.querySelector(containerSelector).classList.add("show");
  document.querySelector(containerSelector).classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (timerID) {
    clearInterval(timerID);
  }
}

function modal(triggerButtonsSelector, timerID) {
  // Modal
  const modal = document.querySelector(".modal");
  const triggerButtons = document.querySelectorAll(triggerButtonsSelector);

  function showModalByScroll() {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    if (
      window.scrollY >=
      scrollHeight - document.documentElement.clientHeight
    ) {
      openModal(".modal", timerID);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  triggerButtons.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();

      openModal(".modal", timerID);
    });
  });

  modal.addEventListener("click", e => {
    if (
      e.target.classList.contains("modal") ||
      e.target.hasAttribute("data-close")
    ) {
      closeModal(".modal");
    }
  });

  document.addEventListener("keyup", e => {
    if (!modal.classList.contains("hide") && e.code === "Escape") {
      closeModal(".modal");
    }
  });

  window.addEventListener("scroll", showModalByScroll);
}

export { modal, openModal, closeModal };
