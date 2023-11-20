//
const btnSelector = document.querySelectorAll(".color");
const selectionSelector = document.querySelector(".selectorActual");

//ramdom de colores
const colors = ["red", "green", "blue", "Yellow"];
let final = randomFinal();

function randomFinal() {
  const finalFinal = [...new Array(4)].map((color) => {
    const random = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[random];
  });
  console.log(finalFinal);
  return finalFinal;
}

btnSelector.forEach((btn) => {
  const color = btn.classList[1];
  btn.addEventListener("click", () => selectColor(color));
});

function selectColor(color) {
  console.log(color);

  const div = document.createElement("div");
  div.classList.add("itemSeleccionado");
  div.classList.add(color);

  selectionSelector.appendChild(div);
}
