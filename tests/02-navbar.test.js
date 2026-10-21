const test = require("node:test");
const assert = require("node:assert/strict");
const { PAGINAS, pagina, destino } = require("./utilidades");

function barra(archivo) {
  const nav = pagina(archivo).querySelector("nav.navbar");
  assert.ok(nav, `${archivo} debería tener un <nav class="navbar ..."> (tráelo de Components → Navbar)`);
  return nav;
}

function enlaces(nav) {
  return [...nav.querySelectorAll("a")]
    .map((a) => `${(a.getAttribute("href") || "").trim()} · ${a.textContent.replace(/\s+/g, " ").trim()}`)
    .join(" | ");
}

test("las tres páginas tienen una navbar que se expande en pantalla grande", () => {
  for (const archivo of PAGINAS) {
    const nav = barra(archivo);
    const expande = [...nav.classList].some((c) => /^navbar-expand(-(sm|md|lg|xl|xxl))?$/.test(c));
    assert.ok(expande, `en ${archivo}, el <nav> debería tener una clase navbar-expand-lg (o -md, -sm…) para mostrar los enlaces en fila en pantalla grande`);
  }
});

test("la marca muestra el nombre Sabores de la Plaza", () => {
  for (const archivo of PAGINAS) {
    const marca = barra(archivo).querySelector(".navbar-brand");
    assert.ok(marca, `en ${archivo}, la navbar debería tener un elemento con la clase navbar-brand`);
    assert.match(marca.textContent, /Sabores de la Plaza/i, `en ${archivo}, la navbar-brand debería decir "Sabores de la Plaza"`);
  }
});

test("el botón del celular abre el menú correcto", () => {
  for (const archivo of PAGINAS) {
    const documento = pagina(archivo);
    const boton = documento.querySelector("nav.navbar .navbar-toggler");
    assert.ok(boton, `en ${archivo}, la navbar debería tener el botón con la clase navbar-toggler (el de las tres rayitas)`);
    assert.equal(boton.getAttribute("data-bs-toggle"), "collapse", `en ${archivo}, el navbar-toggler debería tener data-bs-toggle="collapse"`);
    const objetivo = boton.getAttribute("data-bs-target") || "";
    const menu = destino(documento, objetivo);
    assert.ok(menu, `en ${archivo}, el navbar-toggler apunta a data-bs-target="${objetivo}", pero no hay ningún elemento con ese id (recuerda el #)`);
    assert.ok(menu.classList.contains("collapse") && menu.classList.contains("navbar-collapse"), `en ${archivo}, el elemento ${objetivo} debería tener las clases collapse y navbar-collapse`);
  }
});

test("el menú enlaza las tres páginas", () => {
  for (const archivo of PAGINAS) {
    const hrefs = [...barra(archivo).querySelectorAll("a")].map((a) => (a.getAttribute("href") || "").trim());
    for (const otra of PAGINAS) {
      assert.ok(hrefs.includes(otra), `en ${archivo}, la navbar debería tener un enlace con href="${otra}"`);
    }
  }
});

test("la barra es idéntica en las tres páginas", () => {
  const referencia = enlaces(barra("index.html"));
  assert.ok(referencia, "la navbar de index.html debería tener enlaces");
  for (const archivo of ["puestos.html", "contacto.html"]) {
    assert.equal(enlaces(barra(archivo)), referencia, `la navbar de ${archivo} debería tener los mismos enlaces, con los mismos textos y en el mismo orden que la de index.html (cópiala igual)`);
  }
});
