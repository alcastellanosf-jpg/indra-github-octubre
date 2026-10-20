const mensajes = [
  "¡Qué bueno que estés aquí!",
  "Con HTML, CSS y JavaScript puedes crear cosas geniales.",
  "¡Sigue explorando y aprendiendo!"
];

const mensaje = document.querySelector("#mensaje");
const boton = document.querySelector("#boton-mensaje");
let indiceMensaje = 0;

boton.addEventListener("click", () => {
  indiceMensaje = (indiceMensaje + 1) % mensajes.length;
  mensaje.textContent = mensajes[indiceMensaje];
});

const reloj = document.querySelector("#reloj-analogico");
const agujaHora = document.querySelector("#aguja-hora");
const agujaMinuto = document.querySelector("#aguja-minuto");
const agujaSegundo = document.querySelector("#aguja-segundo");

function actualizarReloj() {
  const ahora = new Date();
  const horas = ahora.getHours() % 12;
  const minutos = ahora.getMinutes();
  const segundos = ahora.getSeconds();

  agujaHora.style.transform = `translateX(-50%) rotate(${horas * 30 + minutos * 0.5}deg)`;
  agujaMinuto.style.transform = `translateX(-50%) rotate(${minutos * 6 + segundos * 0.1}deg)`;
  agujaSegundo.style.transform = `translateX(-50%) rotate(${segundos * 6}deg)`;
  reloj.setAttribute("aria-label", `Hora local: ${ahora.toLocaleTimeString("es-ES")}`);
}

actualizarReloj();
setInterval(actualizarReloj, 1000);

const pantallaCalculadora = document.querySelector("#pantalla-calculadora");
const teclasCalculadora = document.querySelector(".teclas-calculadora");
let valorActual = "0";
let valorGuardado = null;
let operadorPendiente = null;
let iniciarNuevoNumero = false;

function mostrarValor(valor) {
  if (!Number.isFinite(valor)) {
    valorActual = "Error";
    valorGuardado = null;
    operadorPendiente = null;
    iniciarNuevoNumero = true;
  } else {
    valorActual = String(Number(valor.toPrecision(10)));
  }

  pantallaCalculadora.textContent = valorActual;
}

function realizarOperacion(primero, segundo, operador) {
  switch (operador) {
    case "+":
      return primero + segundo;
    case "-":
      return primero - segundo;
    case "*":
      return primero * segundo;
    case "/":
      return segundo === 0 ? NaN : primero / segundo;
    default:
      return segundo;
  }
}

function introducirDigito(digito) {
  if (valorActual === "Error" || iniciarNuevoNumero) {
    valorActual = digito;
    iniciarNuevoNumero = false;
  } else if (valorActual === "0") {
    valorActual = digito;
  } else {
    valorActual += digito;
  }

  pantallaCalculadora.textContent = valorActual;
}

teclasCalculadora.addEventListener("click", (evento) => {
  const tecla = evento.target.closest("button");
  if (!tecla) return;

  if (tecla.dataset.digito !== undefined) {
    introducirDigito(tecla.dataset.digito);
    return;
  }

  if (tecla.dataset.operador) {
    const valor = Number(valorActual);
    if (valorGuardado !== null && operadorPendiente && !iniciarNuevoNumero) {
      const resultado = realizarOperacion(valorGuardado, valor, operadorPendiente);
      mostrarValor(resultado);
      if (valorActual === "Error") return;
    }
    valorGuardado = Number(valorActual);
    operadorPendiente = tecla.dataset.operador;
    iniciarNuevoNumero = true;
    return;
  }

  switch (tecla.dataset.accion) {
    case "limpiar":
      valorActual = "0";
      valorGuardado = null;
      operadorPendiente = null;
      iniciarNuevoNumero = false;
      pantallaCalculadora.textContent = valorActual;
      break;
    case "borrar":
      if (valorActual !== "Error" && !iniciarNuevoNumero) {
        valorActual = valorActual.length > 1 ? valorActual.slice(0, -1) : "0";
        pantallaCalculadora.textContent = valorActual;
      }
      break;
    case "decimal":
      if (valorActual === "Error" || iniciarNuevoNumero) {
        valorActual = "0.";
        iniciarNuevoNumero = false;
      } else if (!valorActual.includes(".")) {
        valorActual += ".";
      }
      pantallaCalculadora.textContent = valorActual;
      break;
    case "calcular":
      if (valorGuardado !== null && operadorPendiente) {
        const resultado = realizarOperacion(
          valorGuardado,
          Number(valorActual),
          operadorPendiente
        );
        mostrarValor(resultado);
        valorGuardado = null;
        operadorPendiente = null;
        iniciarNuevoNumero = true;
      }
      break;
  }
});
