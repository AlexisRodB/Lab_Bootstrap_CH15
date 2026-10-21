const test = require("node:test");
const assert = require("node:assert/strict");
const { PAGINAS, pagina, destino } = require("./utilidades");

// Busca el primer elemento que cumpla el selector en cualquiera de las tres páginas
function buscar(selector) {
  for (const archivo of PAGINAS) {
    const documento = pagina(archivo);
    const elemento = documento.querySelector(selector);
    if (elemento) return { documento, elemento, archivo };
  }
  return null;
}

function carrusel() {
  const hallado = buscar(".carousel");
  assert.ok(hallado, "ninguna página tiene un carrusel: busca el componente Carousel en la documentación");
  return hallado;
}

function acordeon() {
  const hallado = buscar(".accordion");
  assert.ok(hallado, "ninguna página tiene un acordeón: busca el componente Accordion en la documentación");
  return hallado;
}

test("hay un carrusel que pasa solo", () => {
  const { elemento, archivo } = carrusel();
  assert.equal(elemento.getAttribute("data-bs-ride"), "carousel", `el carrusel de ${archivo} debería tener data-bs-ride="carousel" para que las fotos pasen solas`);
});

test("el carrusel tiene al menos 3 fotos y una sola activa", () => {
  const { elemento } = carrusel();
  const fotos = elemento.querySelectorAll(".carousel-item");
  assert.ok(fotos.length >= 3, `el carrusel debería tener al menos 3 elementos carousel-item (tiene ${fotos.length})`);
  const activas = elemento.querySelectorAll(".carousel-item.active");
  assert.equal(activas.length, 1, `exactamente un carousel-item debería tener la clase active, el primero (tiene ${activas.length})`);
});

test("cada foto del carrusel tiene imagen y texto alternativo", () => {
  const { elemento } = carrusel();
  const fotos = [...elemento.querySelectorAll(".carousel-item")];
  assert.ok(fotos.length > 0, "el carrusel debería tener elementos carousel-item");
  for (const foto of fotos) {
    const img = foto.querySelector("img");
    assert.ok(img && img.getAttribute("src"), "cada carousel-item debería tener una <img> con src");
    assert.ok((img.getAttribute("alt") || "").trim(), `la imagen ${img.getAttribute("src")} debería tener un alt que describa la foto`);
  }
});

test("hay un acordeón con al menos 3 preguntas", () => {
  const { elemento } = acordeon();
  const items = elemento.querySelectorAll(".accordion-item");
  assert.ok(items.length >= 3, `el acordeón debería tener al menos 3 accordion-item (tiene ${items.length})`);
});

test("cada pregunta del acordeón abre su propia respuesta", () => {
  const { documento, elemento } = acordeon();
  const items = [...elemento.querySelectorAll(".accordion-item")];
  assert.ok(items.length > 0, "el acordeón debería tener accordion-item");
  for (const item of items) {
    const boton = item.querySelector(".accordion-button");
    assert.ok(boton, "cada accordion-item debería tener un botón con la clase accordion-button");
    assert.equal(boton.getAttribute("data-bs-toggle"), "collapse", `el botón "${boton.textContent.trim()}" debería tener data-bs-toggle="collapse"`);
    const objetivo = boton.getAttribute("data-bs-target") || "";
    const respuesta = destino(documento, objetivo);
    assert.ok(respuesta, `el botón "${boton.textContent.trim()}" apunta a "${objetivo}", pero no hay ningún elemento con ese id (recuerda el #)`);
    assert.ok(item.contains(respuesta) && respuesta.classList.contains("accordion-collapse"), `la respuesta ${objetivo} debería estar en el mismo accordion-item y tener la clase accordion-collapse`);
  }
});

test("hay un modal o unas pestañas que funcionan con atributos", () => {
  for (const archivo of PAGINAS) {
    const documento = pagina(archivo);
    for (const disparador of documento.querySelectorAll("[data-bs-toggle='modal']")) {
      const modal = destino(documento, disparador.getAttribute("data-bs-target"));
      if (modal && modal.classList.contains("modal")) return;
    }
    for (const disparador of documento.querySelectorAll("[data-bs-toggle='tab'], [data-bs-toggle='pill']")) {
      const panel = destino(documento, disparador.getAttribute("data-bs-target") || disparador.getAttribute("href"));
      if (panel && panel.classList.contains("tab-pane")) return;
    }
  }
  assert.fail('ninguna página tiene un modal o unas pestañas que funcionen: el botón necesita data-bs-toggle="modal" (o "tab") y un data-bs-target="#id" que exista, con la clase modal (o tab-pane)');
});
