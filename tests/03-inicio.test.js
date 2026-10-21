const test = require("node:test");
const assert = require("node:assert/strict");
const { BREAKPOINTS, pagina, anchosDeColumna, columnasDe } = require("./utilidades");

// La fila de presentación: una .row de index.html (fuera del nav y del footer) con 3 o 4 columnas
function filaDePresentacion() {
  const filas = [...pagina("index.html").querySelectorAll(".row")].filter((fila) => !fila.closest("nav, footer"));
  const fila = filas.find((f) => [3, 4].includes(columnasDe(f).length));
  assert.ok(fila, 'index.html debería tener una fila <div class="row"> con 3 o 4 columnas (col-...) como hijas directas: los bloques de presentación');
  return columnasDe(fila);
}

test("hay un banner (hero) con un solo h1 y un botón", () => {
  const documento = pagina("index.html");
  const titulos = documento.querySelectorAll("h1");
  assert.equal(titulos.length, 1, `index.html debería tener exactamente un <h1>: el título del banner (tiene ${titulos.length})`);
  const banner = titulos[0].closest("header, section");
  assert.ok(banner, "el <h1> debería estar dentro de un <header> o una <section>: el banner de bienvenida");
  assert.ok(banner.querySelector(".btn"), "el banner debería tener un botón con la clase btn (por ejemplo, que lleve a puestos.html)");
});

test("la presentación tiene 3 o 4 bloques en una fila de Bootstrap", () => {
  const columnas = filaDePresentacion();
  for (const columna of columnas) {
    assert.ok(columna.textContent.trim().length > 0, "cada bloque de presentación debería tener contenido (un título y un texto)");
  }
});

test("en el celular los bloques ocupan todo el ancho", () => {
  for (const columna of filaDePresentacion()) {
    assert.equal(anchosDeColumna(columna).xs, 12, `la columna "${columna.className}" debería ocupar 12 columnas en el celular (usa col-12 o no pongas tamaño sin breakpoint)`);
  }
});

test("en el computador los bloques quedan en una sola fila", () => {
  const columnas = filaDePresentacion();
  const suma = (tamano) => columnas.reduce((total, c) => total + anchosDeColumna(c)[tamano], 0);
  const enFila = BREAKPOINTS.some((tamano) => columnas.every((c) => anchosDeColumna(c)[tamano] > 0) && suma(tamano) === 12);
  assert.ok(enFila, `en pantalla grande los ${columnas.length} bloques deberían sumar exactamente 12 (con ${columnas.length} bloques, ¿cuánto es 12 ÷ ${columnas.length}?)`);
});

test("hay un footer con los datos del colectivo", () => {
  const footer = pagina("index.html").querySelector("footer");
  assert.ok(footer, "index.html debería tener un <footer>");
  assert.ok(footer.textContent.trim().length >= 20, "el <footer> debería tener los datos del colectivo (dirección, horario o contacto)");
});
