const test = require("node:test");
const assert = require("node:assert/strict");
const { pagina } = require("./utilidades");

function tabla() {
  const encontrada = pagina("puestos.html").querySelector("table");
  assert.ok(encontrada, "puestos.html debería tener una <table> con los precios (búscala en Content → Tables)");
  return encontrada;
}

test("hay al menos 3 distintivos (badge) dentro de las tarjetas", () => {
  const distintivos = pagina("puestos.html").querySelectorAll(".card .badge");
  assert.ok(distintivos.length >= 3, `debería haber al menos 3 elementos con la clase badge dentro de las tarjetas (hay ${distintivos.length}). Búscalos en Components → Badge`);
});

test("cada distintivo tiene un color", () => {
  const distintivos = [...pagina("puestos.html").querySelectorAll(".badge")];
  assert.ok(distintivos.length > 0, "debería haber elementos con la clase badge");
  for (const badge of distintivos) {
    const conColor = [...badge.classList].some((c) => /^(text-bg|bg)-\w+/.test(c));
    assert.ok(conColor, `el badge "${badge.textContent.trim()}" debería tener una clase de color, por ejemplo text-bg-success`);
  }
});

test("la tabla de precios tiene el estilo de Bootstrap", () => {
  assert.ok(tabla().classList.contains("table"), 'la <table> debería tener la clase table (sin ella se ve como una tabla sin estilo)');
});

test("la tabla tiene encabezado con al menos 2 columnas", () => {
  const encabezados = tabla().querySelectorAll("thead th");
  assert.ok(encabezados.length >= 2, `la tabla debería tener un <thead> con al menos 2 <th>, por ejemplo Producto y Precio (tiene ${encabezados.length})`);
});

test("la tabla tiene al menos 3 productos", () => {
  const filas = tabla().querySelectorAll("tbody tr");
  assert.ok(filas.length >= 3, `la tabla debería tener un <tbody> con al menos 3 filas <tr> (tiene ${filas.length})`);
});
