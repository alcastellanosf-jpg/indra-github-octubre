const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const script = fs.readFileSync(
  path.join(__dirname, "..", "script.js"),
  "utf8"
);

function createPage() {
  const elements = new Map();
  const selectors = [
    "#mensaje",
    "#boton-mensaje",
    "#reloj-analogico",
    "#aguja-hora",
    "#aguja-minuto",
    "#aguja-segundo",
    "#pantalla-calculadora",
    ".teclas-calculadora"
  ];

  for (const selector of selectors) {
    elements.set(selector, {
      attributes: {},
      style: {},
      textContent: "",
      addEventListener(eventName, listener) {
        this.listener = listener;
      },
      setAttribute(name, value) {
        this.attributes[name] = value;
      }
    });
  }

  class FixedDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [2024, 0, 1, 3, 15, 20]));
    }
  }

  let interval;
  vm.runInNewContext(script, {
    Date: FixedDate,
    document: {
      querySelector(selector) {
        return elements.get(selector);
      }
    },
    setInterval(callback, delay) {
      interval = { callback, delay };
    }
  });

  return { elements, interval };
}

function press(page, dataset) {
  const button = { dataset };
  page.elements.get(".teclas-calculadora").listener({
    target: { closest: () => button }
  });
}

test("recorre los mensajes y vuelve al primero", () => {
  const page = createPage();
  const button = page.elements.get("#boton-mensaje");

  button.listener();
  assert.equal(page.elements.get("#mensaje").textContent, "Con HTML, CSS y JavaScript puedes crear cosas geniales.");

  button.listener();
  assert.equal(page.elements.get("#mensaje").textContent, "¡Sigue explorando y aprendiendo!");

  button.listener();
  assert.equal(page.elements.get("#mensaje").textContent, "¡Qué bueno que estés aquí!");
});

test("actualiza las agujas del reloj y programa una actualización por segundo", () => {
  const page = createPage();

  assert.equal(page.elements.get("#aguja-hora").style.transform, "translateX(-50%) rotate(97.5deg)");
  assert.equal(page.elements.get("#aguja-minuto").style.transform, "translateX(-50%) rotate(91deg)");
  assert.equal(page.elements.get("#aguja-segundo").style.transform, "translateX(-50%) rotate(120deg)");
  assert.match(page.elements.get("#reloj-analogico").attributes["aria-label"], /^Hora local: /);
  assert.equal(page.interval.delay, 1000);
});

for (const [operator, first, second, expected] of [
  ["+", "7", "2", "9"],
  ["-", "7", "2", "5"],
  ["*", "7", "2", "14"],
  ["/", "8", "2", "4"]
]) {
  test(`la calculadora realiza la operación ${operator}`, () => {
    const page = createPage();

    press(page, { digito: first });
    press(page, { operador: operator });
    press(page, { digito: second });
    press(page, { accion: "calcular" });

    assert.equal(page.elements.get("#pantalla-calculadora").textContent, expected);
  });
}

test("la calculadora admite decimales, evita duplicarlos y borra dígitos", () => {
  const page = createPage();

  press(page, { digito: "1" });
  press(page, { accion: "decimal" });
  press(page, { accion: "decimal" });
  press(page, { digito: "5" });
  assert.equal(page.elements.get("#pantalla-calculadora").textContent, "1.5");

  press(page, { accion: "borrar" });
  assert.equal(page.elements.get("#pantalla-calculadora").textContent, "1.");
});

test("la calculadora encadena operaciones y permite limpiar", () => {
  const page = createPage();

  press(page, { digito: "2" });
  press(page, { operador: "+" });
  press(page, { digito: "3" });
  press(page, { operador: "*" });
  press(page, { digito: "4" });
  press(page, { accion: "calcular" });
  assert.equal(page.elements.get("#pantalla-calculadora").textContent, "20");

  press(page, { accion: "limpiar" });
  assert.equal(page.elements.get("#pantalla-calculadora").textContent, "0");
});

test("la división entre cero muestra error y el siguiente dígito inicia un valor nuevo", () => {
  const page = createPage();

  press(page, { digito: "8" });
  press(page, { operador: "/" });
  press(page, { digito: "0" });
  press(page, { accion: "calcular" });
  assert.equal(page.elements.get("#pantalla-calculadora").textContent, "Error");

  press(page, { digito: "3" });
  assert.equal(page.elements.get("#pantalla-calculadora").textContent, "3");
});
