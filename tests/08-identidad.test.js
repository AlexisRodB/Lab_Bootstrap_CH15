const test = require("node:test");
const assert = require("node:assert/strict");
const { PAGINAS, pagina, reglasCSS, propiedadesDe } = require("./utilidades");

const AVISO = "(si sí la escribiste, revisa que la regla de arriba cierre su llave })";

function fuenteDeGoogle(archivo) {
  const link = [...pagina(archivo).querySelectorAll("head link[rel='stylesheet']")].find((l) => /fonts\.googleapis\.com/.test(l.getAttribute("href") || ""));
  return link ? link.getAttribute("href") : "";
}

function fuenteDeclarada() {
  return propiedadesDe(":root")["--bs-body-font-family"] || propiedadesDe("body")["font-family"] || "";
}

test("styles.css cambia el color principal de Bootstrap", () => {
  const raiz = propiedadesDe(":root");
  assert.ok(raiz["--bs-primary"], `:root debería redefinir --bs-primary con tu color principal ${AVISO}`);
  const rgb = raiz["--bs-primary-rgb"] || "";
  assert.ok(rgb, ":root también debería redefinir --bs-primary-rgb con el mismo color en números (sin ella, bg-primary y text-primary siguen azules)");
  assert.notEqual(rgb.replace(/\s/g, ""), "13,110,253", "--bs-primary-rgb tiene el azul de Bootstrap (13, 110, 253): pon los números de tu color");
});

test("los botones principales también cambian de color", () => {
  const boton = reglasCSS().find((r) => /\.btn-[\w-]+/.test(r.selector) && (r.propiedades["--bs-btn-bg"] || r.propiedades["background-color"]));
  assert.ok(boton, `styles.css debería tener una regla para .btn-primary (o tu propia clase .btn-...) que cambie --bs-btn-bg ${AVISO}`);
});

test("la letra de todo el sitio es propia", () => {
  assert.ok(fuenteDeclarada(), `styles.css debería cambiar la letra: --bs-body-font-family en :root (o font-family en body) ${AVISO}`);
});

test("las tres páginas traen la fuente de Google Fonts", () => {
  for (const archivo of PAGINAS) {
    assert.ok(fuenteDeGoogle(archivo), `${archivo} debería tener en el <head> el <link> de Google Fonts con tu fuente`);
  }
});

test("la fuente que traes es la misma que usas en styles.css", () => {
  const href = fuenteDeGoogle("index.html");
  const familia = decodeURIComponent((href.match(/family=([^:&]+)/) || [])[1] || "").replace(/\+/g, " ");
  assert.ok(familia, "index.html debería traer una fuente de Google Fonts (el enlace lleva family=NombreDeLaFuente)");
  assert.ok(fuenteDeclarada().toLowerCase().includes(familia.toLowerCase()), `traes la fuente "${familia}" de Google Fonts, pero styles.css no la usa en --bs-body-font-family`);
});
