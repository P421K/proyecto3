const btnSelector = document.querySelectorAll(".color");
const selectionSelector = document.querySelector(".selectorActual");

btnSelector.forEach((btn) => {
  const color = btn.classList[1];
  btn.addEventListener("click", () => selectColor(color));
});

function selectColor(color) {
  console.log(color);

  const div = document.createElement('div');
  div.classList.add("itemSeleccionado");
  div.classList.add(color);

  selectionSelector.appendChild(div);
}
