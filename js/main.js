// Seleccionar todos los botones de color
const btnSelector = document.querySelectorAll(".color");

// Seleccionar el área donde se muestra la combinación actual y las respuestas
const selectionSelector = document.querySelector(".selectorActual");
const muestraOportunidad = document.querySelector(".oportunidades");

// Colores posibles para el juego
const colors = ["red", "green", "blue", "yellow"];

// Inicializar la combinación final aleatoria
let final = randomFinal();

// Almacenar los colores seleccionados por el jugador
const selectedColors = [];

// Contador de intentos
let times = 0;

// Número máximo de intentos permitidos
const maxAttempts = 10;

// Almacenar las respuestas dadas por el juego
let oportunidades = [];

// Bandera para verificar si el juego ha terminado
let juegoTerminado = false;

// Función para guardar el nombre del jugador en el almacenamiento local
function guardarNombre() {
  var playerName = document.getElementById("name").value;
  localStorage.setItem("nombre", playerName);
}

// Función para mostrar el nombre almacenado del jugador
function mostrarNombreAlmacenado() {
  var nombreJugadorAlmacenado = localStorage.getItem("nombre");
  var nombreJugadorElemento = document.getElementById("nombreJugador");

  if (nombreJugadorElemento) {
    nombreJugadorElemento.textContent =
      "Hola, " + nombreJugadorAlmacenado + "!";
    // console.log(nombreJugadorAlmacenado);
  }
}

// Función para reiniciar el juego
function resetGame() {
  final = randomFinal();
  times = 0;
  muestraOportunidad.innerHTML = "";
  juegoTerminado = false;
  selectedColors.length = 0;
}

// Mostrar el nombre almacenado al cargar la página
mostrarNombreAlmacenado();

// Función para generar una combinación aleatoria de colores
function randomFinal() {
  const randomSelec = [...new Array(4)].map(() => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  });
  // console.log(randomSelec); // para saber la combinaciom
  return randomSelec;
}

// Función para calcular las respuestas del juego
function calculoOportunidades(colors) {
  const oportunidades = [];

  colors.forEach((color, index) => {
    if (final[index] === color) {
      oportunidades.push("correcto");
    } else if (final.includes(color)) {
      oportunidades.push("incorrecto");
    }
  });

  // Llenar con "incorrecto" si las respuestas no llegan a 4
  while (oportunidades.length < 4) {
    oportunidades.push("incorrecto");
  }

  return oportunidades;
}

// Agregar un evento a cada botón de color
btnSelector.forEach((btn) => {
  const color = btn.classList[1];
  btn.addEventListener("click", () => {
    if (!juegoTerminado) {
      selectColor(color);
    }
  });
});

// Función para manejar la selección de un color por el jugador
function selectColor(color) {
  // console.log(color);

  // Crear un elemento div para mostrar el color seleccionado
  const div = document.createElement("div");
  div.classList.add("itemSeleccionado");
  div.classList.add(color);
  selectionSelector.appendChild(div);
  selectedColors.push(color);

  if (selectedColors.length === 4) {
    times++;

    // Crear un contenedor para mostrar la combinación seleccionada y las respuestas
    const adivinanza = document.createElement("div");
    adivinanza.classList.add("adivinanza");
    muestraOportunidad.appendChild(adivinanza);

    // Mostrar los colores seleccionados por el jugador
    for (const selColor of selectedColors) {
      const divGuardado = document.createElement("div");
      divGuardado.classList.add("colorGuardado");
      divGuardado.classList.add(selColor);
      adivinanza.appendChild(divGuardado);
    }

    // Agregar una línea visual (hr) entre colores seleccionados y respuestas
    const hr = document.createElement("hr");
    adivinanza.appendChild(hr);

    // Calcular las respuestas del juego
    oportunidades = calculoOportunidades(selectedColors);

    // Mostrar las respuestas con colores indicativos (verde o rojo)
    for (let i = 0; i < oportunidades.length; i++) {
      const divOportArray = document.createElement("div");

      if (oportunidades[i] === "correcto") {
        divOportArray.classList.add("circulo");
        divOportArray.classList.add("verde");
      } else {
        divOportArray.classList.add("circulo");
        divOportArray.classList.add("rojo");
      }

      adivinanza.appendChild(divOportArray);
    }

    // Reiniciar los colores seleccionados y el área de selección
    selectedColors.length = 0;
    selectionSelector.textContent = "";

    // Comprobar si se alcanzó el número máximo de intentos
    if (times >= maxAttempts) {
      alert("Game over. No has adivinado los colores.");
      juegoTerminado = true;
      resetGame();
    }

    // Comprobar si se adivinaron todos los colores
    if (oportunidades.every((hint) => hint === "correcto")) {
      alert("¡Felicidades! Has adivinado los colores.");
      juegoTerminado = true;
      resetGame();
    }
  }
}
