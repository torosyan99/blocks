const select = document.querySelector(".request__select");
const selectInput = select.querySelector(".request__input");
const selectList = document.querySelector(".request__select-list");
const selectButton = document.querySelector(".request__select-button");
const form = document.querySelector(".request__form");

let imaskItem;

function addSelectItems(list) {
  data.forEach((i, index) => {
    const item = document.createElement("li");
    item.className = "request__select-item";

    item.innerHTML = `
    <button class=request__item-choice type=button data-index=${index}>
    <p class=request__choice-country>
    ${i.name}
    </p>
    ${i.dial_code}
    <img class=request__flag  src="images/countries/${i.code.toLowerCase()}.png"/>
    </button>`;

    list.append(item);
  });
}

addSelectItems(selectList);

function choiceItem(index = 136) {
  const activeCountry = data[index];

  selectButton.innerHTML = `
    <img class=request__flag  src="images/countries/${activeCountry.code.toLowerCase()}.png"/>
    ${activeCountry.dial_code}
    <div class=request__arrow></div>
  `;

  const placeholder =  activeCountry.example.replace(/\d/g, "0")

  selectInput.placeholder =  placeholder
  if (imaskItem) {
    imaskItem.updateOptions({
      mask: placeholder.replace(/\d/g, "0"),
    });
    selectInput.value = "";
  } else
    imaskItem = IMask(selectInput, {
      mask: placeholder.replace(/\d/g, "0"),
    });
}

choiceItem();

document.body.addEventListener("click", (e) => {
  const target = e.target;

  if (target == selectButton) {
    selectList.style.display = "flex";
  } else if (target.classList.contains("request__item-choice")) {
    choiceItem(target.dataset.index);
    selectList.style.display = "none";
  } else if (selectList.style.display === "flex") {
    selectList.style.display = "none";
  }
});


