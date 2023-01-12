function hamburger() {
  const hamburger = document.querySelector(".hamburger");
  const header = document.querySelector(".header");
  const background = document.querySelector(".background");
  const links = header.querySelectorAll("a");
  const btn = header.querySelector("button");

  function removeActive() {
    hamburger.classList.remove("hamburger_active");
    header.classList.remove("header_active");
    background.classList.remove("background_active");
  }

  background.addEventListener("click", () => {
    removeActive();
  });

  header.addEventListener("click", e => {
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") return;
    removeActive();
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    header.classList.toggle("header_active");
    background.classList.toggle("background_active");
  });
}

export { hamburger };
