//
const btnSelector = document.querySelectorAll(".color");
const selectionSelector = document.querySelector(".selectorActual");
const muestraOportunidad = document.querySelector(".oportunidades");

//ramdom de colores
const colors = ["red", "green", "blue", "Yellow"];
let final = randomFinal();
const selectedColors = [];
let times = 0;
let oportunidades = 0;
let hint;
var playerName = document.getElementById("name").value;

//almacenando nombre de usuario
localStorage.setItem("nombre", playerName);

//mostrando nombre de usuario
var nombreAlmacenado = localStorage.getItem("nombre");
console.log(nombreAlmacenado);

function randomFinal() {
  const randomSelec = [...new Array(4)].map((color) => {
    const random = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[random];
  });
  console.log(randomSelec);
  return randomSelec;
}

btnSelector.forEach((btn) => {
  const color = btn.classList[1];
  btn.addEventListener("click", () => selectColor(color));
});

function selectColor(color) {
  console.log(color);

  //
  const div = document.createElement("div");
  div.classList.add("itemSeleccionado");
  div.classList.add(color);
  selectionSelector.appendChild(div);
  selectedColors.push(color);

  if (selectedColors.length === 4) {
    times++;
    for (const selColor of selectedColors) {
      const divGuardado = document.createElement("div");
      divGuardado.classList.add("colorGuardado");
      divGuardado.classList.add(selColor);
      muestraOportunidad.appendChild(divGuardado);
    }

    const oportunidadesArray = calculoOportunidades(selectedColors);

    for (const hint of oportunidadesArray) {
      const divOportArray = document.createElement("div");
      if (hint === "correcto") {
        divOportArray.classList.add("correcto");
      } else {
        divOportArray.classList.add("medio");
      }
      muestraOportunidad.appendChild(divOportArray);
    }

    selectedColors.length = 0;
    selectionSelector.innerHTML = "";
    if (times > 2) {
      alert("game over");
    }
    if (
      oportunidades.every(hint === "correcto") &&
      oportunidades.length === final.length
    ) {
      alert("ganaste!");
    }
  }
}

function calculoOportunidades(colors) {
  const oportunidades = [];
  const comparacion = [];

  colors.forEach((color, index) => {
    if (final[index] === color) {
      oportunidades.push("correcto");
      comparacion.push(color);
      console.log(oportunidades);
    }
  });

  colors.forEach((color, index) => {
    if (!comparacion.includes(color) && final.includes(color)) {
      oportunidades.push("medio");
    }
  });
  return oportunidades;
}
