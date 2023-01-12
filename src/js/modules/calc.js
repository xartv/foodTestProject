function calc() {
  // create calc
  const resultField = document.querySelector(".calculating__result span");
  let sex, activity, height, weight, age;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("activity")) {
    activity = localStorage.getItem("activity");
  } else {
    activity = 1.375;
    localStorage.setItem("activity", 1.375);
  }

  getStaticInformation(
    ".calculating__choose",
    "calculating__choose-item_active"
  );
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );
  getVariableInformation("#height");
  getVariableInformation("#weight");
  getVariableInformation("#age");
  initActivityClass(".calculating__choose", "calculating__choose-item_active");
  initActivityClass(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );
  calcCalories();

  function calcCalories() {
    if (!sex || !height || !weight || !age || !activity) {
      resultField.innerHTML = "____";
      return;
    }

    if (sex == "female") {
      resultField.innerHTML = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity
      );
    } else {
      resultField.innerHTML = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity
      );
    }
  }

  function getStaticInformation(parentSelector, activityClass) {
    const parent = document.querySelector(parentSelector);
    const elements = parent.querySelectorAll("div");

    parent.addEventListener("click", e => {
      const target = e.target;

      if ((!target.dataset.ratio && !target.id) || target.id == "gender") {
        return;
      }

      if (target.dataset.ratio) {
        activity = target.dataset.ratio;
        localStorage.setItem("activity", target.dataset.ratio);
      }

      if (target.id == "male" || target.id == "female") {
        sex = target.id;
        localStorage.setItem("sex", target.id);
      }

      elements.forEach(elem => {
        elem.classList.remove(activityClass);
      });

      target.classList.add(activityClass);

      calcCalories();
    });
  }

  function getVariableInformation(id) {
    const input = document.querySelector(id);

    input.addEventListener("input", e => {
      switch (id) {
        case "#height":
          height = input.value;
          break;

        case "#weight":
          weight = input.value;
          break;

        case "#age":
          age = input.value;
          break;
      }

      calcCalories();
    });
  }

  function initActivityClass(parentSelector, activityClass) {
    document
      .querySelector(parentSelector)
      .querySelectorAll("div")
      .forEach(item => {
        item.classList.remove(activityClass);

        if (item.id === localStorage.getItem("sex")) {
          item.classList.add(activityClass);
        }

        if (item.dataset.ratio === localStorage.getItem("activity")) {
          item.classList.add(activityClass);
        }
      });
  }
}

export { calc };
