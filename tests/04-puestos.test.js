const test = require("node:test");
const assert = require("node:assert/strict");
const { BREAKPOINTS, pagina, anchosDeColumna, columnasDe } = require("./utilidades");

const CATEGORIAS = ["fruta", "panader", "almuerzo", "jugo", "cafe"];

function sinTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// La fila principal de puestos.html: dos columnas, un lateral angosto y un contenido ancho.
// Con sumaExacta = true, además deben sumar 12 en pantalla grande (lo revisa el primer test).
function lateralYContenido(sumaExacta = false) {
  const filas = [...pagina("puestos.html").querySelectorAll(".row")].filter((fila) => !fila.closest("nav, footer"));
  for (const fila of filas) {
    const columnas = columnasDe(fila);
    if (columnas.length !== 2) continue;
    const [lateral, contenido] = columnas.map(anchosDeColumna);
    const ok = BREAKPOINTS.some((t) => lateral[t] > 0 && contenido[t] > 0 && lateral[t] < contenido[t] && (!sumaExacta || lateral[t] + contenido[t] === 12));
    if (ok) return { lateral: columnas[0], contenido: columnas[1] };
  }
  return null;
}

function tarjetas() {
  const zonas = lateralYContenido();
  assert.ok(zonas, "primero arma la fila con el lateral y el contenido (dos columnas dentro de una row)");
  return [...zonas.contenido.querySelectorAll(".card")];
}

test("hay una fila con un lateral angosto y un contenido ancho que suman 12", () => {
  assert.ok(lateralYContenido(true), 'puestos.html debería tener una fila <div class="row"> con dos columnas: un lateral angosto y un contenido ancho que sumen 12 en pantalla grande (por ejemplo col-lg-3 y col-lg-9)');
});

test("el lateral tiene las 5 categorías de puestos", () => {
  const zonas = lateralYContenido();
  assert.ok(zonas, "primero arma la fila con el lateral y el contenido (dos columnas dentro de una row)");
  const texto = sinTildes(zonas.lateral.textContent);
  for (const categoria of CATEGORIAS) {
    assert.ok(texto.includes(categoria), `el lateral debería incluir la categoría que contiene "${categoria}" (frutas, panadería, almuerzos, jugos y café)`);
  }
});

test("el contenido tiene al menos 4 tarjetas, cada una en su columna", () => {
  const lista = tarjetas();
  assert.ok(lista.length >= 4, `el contenido debería tener al menos 4 tarjetas con la clase card (tiene ${lista.length})`);
  for (const tarjeta of lista) {
    assert.ok(anchosDeColumna(tarjeta.parentElement), "cada card debería ir dentro de su propia columna col-... (la columna reparte el espacio; la tarjeta va adentro)");
  }
});

test("cada tarjeta tiene nombre, descripción y botón", () => {
  const lista = tarjetas();
  assert.ok(lista.length > 0, "el contenido debería tener tarjetas con la clase card");
  for (const tarjeta of lista) {
    assert.ok(tarjeta.querySelector(".card-title"), "cada tarjeta debería tener un título con la clase card-title");
    assert.ok(tarjeta.querySelector(".card-text"), "cada tarjeta debería tener una descripción con la clase card-text");
    assert.ok(tarjeta.querySelector(".btn"), "cada tarjeta debería tener un botón con la clase btn");
  }
});

test("las tarjetas de una fila quedan de la misma altura", () => {
  const lista = tarjetas();
  assert.ok(lista.length > 0, "el contenido debería tener tarjetas con la clase card");
  for (const tarjeta of lista) {
    assert.ok(tarjeta.classList.contains("h-100"), "cada card debería tener la clase h-100 para que todas las de una fila midan lo mismo");
  }
});

test("en el celular hay menos tarjetas por fila que en el computador", () => {
  const lista = tarjetas();
  assert.ok(lista.length > 0, "el contenido debería tener tarjetas con la clase card");
  for (const tarjeta of lista) {
    const anchos = anchosDeColumna(tarjeta.parentElement) || { xs: 12, xxl: 12 };
    assert.ok(anchos.xxl > 0 && anchos.xxl < anchos.xs, `la columna "${tarjeta.parentElement.className}" debería ocupar menos columnas en pantalla grande que en el celular (por ejemplo col-12 col-md-6 col-xl-4)`);
  }
});
