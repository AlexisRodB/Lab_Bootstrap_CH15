const test = require("node:test");
const assert = require("node:assert/strict");
const { PAGINAS, pagina } = require("./utilidades");

const CSS_BOOTSTRAP = /bootstrap@5[\w.-]*\/dist\/css\/bootstrap(\.min)?\.css/;
const JS_BOOTSTRAP = /bootstrap@5[\w.-]*\/dist\/js\/bootstrap\.bundle(\.min)?\.js/;

function hojasDeEstilo(documento) {
  return [...documento.querySelectorAll("head link[rel='stylesheet']")].map((l) => l.getAttribute("href") || "");
}

test("las tres páginas tienen el meta viewport para celular", () => {
  for (const archivo of PAGINAS) {
    const meta = pagina(archivo).querySelector("head meta[name='viewport']");
    assert.ok(meta, `${archivo} debería tener <meta name="viewport" ...> en el <head> (sin él, Bootstrap no puede adaptarse al celular)`);
    assert.match(meta.getAttribute("content") || "", /width=device-width/, `en ${archivo}, el viewport debería decir content="width=device-width, initial-scale=1"`);
  }
});

test("las tres páginas cargan el CSS de Bootstrap 5 en el head", () => {
  for (const archivo of PAGINAS) {
    const carga = hojasDeEstilo(pagina(archivo)).some((href) => CSS_BOOTSTRAP.test(href));
    assert.ok(carga, `${archivo} debería tener en el <head> el <link> al CSS de Bootstrap 5 (cópialo de la documentación oficial)`);
  }
});

test("styles.css se carga después de Bootstrap en las tres páginas", () => {
  for (const archivo of PAGINAS) {
    const hojas = hojasDeEstilo(pagina(archivo));
    const bootstrap = hojas.findIndex((href) => CSS_BOOTSTRAP.test(href));
    const propio = hojas.findIndex((href) => /(^|\/)styles\.css$/.test(href));
    assert.ok(propio !== -1, `${archivo} debería tener <link href="styles.css" rel="stylesheet"> en el <head>`);
    assert.ok(bootstrap !== -1 && propio > bootstrap, `en ${archivo}, el <link> a styles.css debería ir DESPUÉS del de Bootstrap (si va antes, Bootstrap pisa tus cambios)`);
  }
});

test("el JavaScript de Bootstrap va al final del body", () => {
  for (const archivo of PAGINAS) {
    const documento = pagina(archivo);
    const script = [...documento.querySelectorAll("script[src]")].find((s) => JS_BOOTSTRAP.test(s.getAttribute("src")));
    assert.ok(script, `${archivo} debería cargar bootstrap.bundle.min.js (sin él no funcionan el menú del celular, el carrusel ni el acordeón)`);
    assert.equal(script.parentElement, documento.body, `en ${archivo}, el <script> de Bootstrap debería ir dentro del <body>, no en el <head>`);
    let siguiente = script.nextElementSibling;
    while (siguiente && siguiente.tagName === "SCRIPT") siguiente = siguiente.nextElementSibling;
    assert.equal(siguiente, null, `en ${archivo}, el <script> de Bootstrap debería ir al FINAL del <body>, después de todo tu contenido`);
  }
});

test("el único JavaScript es el de Bootstrap (nada de JS propio)", () => {
  for (const archivo of PAGINAS) {
    const documento = pagina(archivo);
    const scripts = [...documento.querySelectorAll("script")];
    assert.ok(scripts.length > 0, `${archivo} debería cargar el JavaScript de Bootstrap`);
    for (const script of scripts) {
      const src = script.getAttribute("src") || "";
      assert.ok(src.includes("bootstrap"), `${archivo} tiene un <script> que no es de Bootstrap: este taller se hace sin JavaScript propio`);
    }
    const conEvento = [...documento.querySelectorAll("*")].find((el) => [...el.attributes].some((a) => /^on/i.test(a.name)));
    assert.equal(conEvento, undefined, `${archivo} tiene un atributo como onclick: este taller se hace sin JavaScript propio`);
  }
});
