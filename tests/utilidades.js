// Ayudas para los tests: abren tus páginas en un navegador simulado (jsdom)
// y leen tu styles.css. Ningún test corre JavaScript: este taller no lleva JS propio.
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM, VirtualConsole } = require("jsdom");

const CARPETA = path.join(__dirname, "..", "plaza");
const PAGINAS = ["index.html", "puestos.html", "contacto.html"];
const BREAKPOINTS = ["sm", "md", "lg", "xl", "xxl"];

function leer(archivo) {
  const ruta = path.join(CARPETA, archivo);
  if (!fs.existsSync(ruta)) throw new Error(`No encuentro plaza/${archivo}: no le cambies el nombre ni la carpeta`);
  return fs.readFileSync(ruta, "utf8");
}

// Una página tal como está en el archivo, sin correr JavaScript
function pagina(archivo) {
  return new JSDOM(leer(archivo), { virtualConsole: new VirtualConsole() }).window.document;
}

// Las reglas de tu styles.css: [{ selector, propiedades: { color: "...", ... } }]
function reglasCSS() {
  const dom = new JSDOM("<style></style>", { virtualConsole: new VirtualConsole() });
  const style = dom.window.document.querySelector("style");
  style.textContent = leer("styles.css");
  const reglas = [];
  for (const regla of style.sheet.cssRules) {
    if (!regla.style) continue;
    const propiedades = {};
    for (let i = 0; i < regla.style.length; i++) {
      const nombre = regla.style[i];
      propiedades[nombre] = regla.style.getPropertyValue(nombre).trim();
    }
    reglas.push({ selector: regla.selectorText, propiedades });
  }
  return reglas;
}

// Las propiedades de todas las reglas cuyo selector incluye exactamente `selector`
function propiedadesDe(selector) {
  const reglas = reglasCSS().filter((r) => r.selector.split(",").map((p) => p.trim()).includes(selector));
  return Object.assign({}, ...reglas.map((r) => r.propiedades));
}

// Cuántas columnas ocupa un elemento en cada tamaño de pantalla, según sus clases col-*.
// Ejemplo: "col-12 col-md-6 col-lg-4" → { xs: 12, sm: 12, md: 6, lg: 4, xl: 4, xxl: 4 }
// Si no tiene ninguna clase col, retorna null.
function anchosDeColumna(elemento) {
  const clases = [...elemento.classList];
  if (!clases.some((c) => /^col(-|$)/.test(c))) return null;
  const propio = {};
  for (const clase of clases) {
    const m = clase.match(/^col(?:-(sm|md|lg|xl|xxl))?(?:-(\d+|auto))?$/);
    if (!m) continue;
    const tamano = m[1] || "xs";
    propio[tamano] = m[2] && m[2] !== "auto" ? Number(m[2]) : 0;
  }
  const anchos = {};
  let actual = 12;
  for (const tamano of ["xs", ...BREAKPOINTS]) {
    if (tamano in propio) actual = propio[tamano];
    anchos[tamano] = actual;
  }
  return anchos;
}

// Las columnas que son hijas directas de una fila .row
function columnasDe(fila) {
  return [...fila.children].filter((hijo) => anchosDeColumna(hijo));
}

// Busca el elemento de id "#algo" (el valor de data-bs-target o href)
function destino(documento, selector) {
  if (!selector || !selector.startsWith("#") || selector.length < 2) return null;
  return documento.getElementById(selector.slice(1));
}

module.exports = { PAGINAS, BREAKPOINTS, leer, pagina, reglasCSS, propiedadesDe, anchosDeColumna, columnasDe, destino };
