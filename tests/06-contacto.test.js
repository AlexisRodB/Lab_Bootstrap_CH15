const test = require("node:test");
const assert = require("node:assert/strict");
const { BREAKPOINTS, pagina, anchosDeColumna } = require("./utilidades");

const SIN_ETIQUETA = ["hidden", "submit", "button", "reset", "image"];

function formulario() {
  const form = pagina("contacto.html").querySelector("form");
  assert.ok(form, "contacto.html debería tener un <form>");
  return form;
}

function campos(form) {
  return [...form.querySelectorAll("input, select, textarea")].filter((c) => !SIN_ETIQUETA.includes((c.getAttribute("type") || "").toLowerCase()));
}

test("el formulario tiene nombre, contacto, puesto y mensaje", () => {
  const form = formulario();
  assert.ok(form.querySelector("input[type='text']"), 'el formulario debería tener un campo de texto para el nombre: <input type="text">');
  assert.ok(form.querySelector("input[type='tel'], input[type='email']"), 'el formulario debería tener un campo de teléfono o correo: <input type="tel"> o <input type="email">');
  assert.ok(form.querySelector("select"), "el formulario debería tener un <select> para elegir el puesto");
  assert.ok(form.querySelector("textarea"), "el formulario debería tener un <textarea> para el mensaje");
});

test("cada campo tiene su label conectado con for e id", () => {
  const form = formulario();
  const lista = campos(form);
  assert.ok(lista.length > 0, "el formulario debería tener campos");
  for (const campo of lista) {
    const id = campo.getAttribute("id");
    assert.ok(id, `el campo <${campo.tagName.toLowerCase()}> debería tener un id para conectarlo con su label`);
    assert.ok(form.ownerDocument.querySelector(`label[for="${id}"]`), `el campo con id="${id}" debería tener un <label for="${id}"> (el for y el id deben ser iguales)`);
  }
});

test("los campos usan las clases de formulario de Bootstrap", () => {
  const lista = campos(formulario());
  assert.ok(lista.length > 0, "el formulario debería tener campos");
  for (const campo of lista) {
    const tipo = (campo.getAttribute("type") || "").toLowerCase();
    if (["checkbox", "radio"].includes(tipo)) continue;
    const clase = campo.tagName === "SELECT" ? "form-select" : "form-control";
    assert.ok(campo.classList.contains(clase), `el campo con id="${campo.id}" debería tener la clase ${clase}`);
  }
});

test("el menú de puestos tiene al menos 3 opciones para elegir", () => {
  const select = formulario().querySelector("select");
  assert.ok(select, "el formulario debería tener un <select>");
  const opciones = [...select.querySelectorAll("option")].filter((o) => !o.disabled && o.value.trim() !== "");
  assert.ok(opciones.length >= 3, `el <select> debería tener al menos 3 <option> con puestos para elegir (tiene ${opciones.length})`);
});

test("hay un botón de envío con estilo de Bootstrap", () => {
  const boton = formulario().querySelector("button[type='submit'], input[type='submit']");
  assert.ok(boton, 'el formulario debería tener un <button type="submit">');
  assert.ok(boton.classList.contains("btn") && [...boton.classList].some((c) => /^btn-\w+/.test(c)), "el botón de envío debería tener la clase btn y una de color, por ejemplo btn btn-primary");
});

test("el formulario queda centrado y no ocupa todo el ancho en pantalla grande", () => {
  const form = formulario();
  let columna = form;
  while (columna && !anchosDeColumna(columna)) columna = columna.parentElement;
  assert.ok(columna, "el formulario debería ir dentro de una columna col-... (dentro de una fila row)");
  const anchos = anchosDeColumna(columna);
  assert.ok(BREAKPOINTS.some((t) => anchos[t] > 0 && anchos[t] < 12), 'la columna del formulario debería ocupar menos de 12 en pantalla grande, por ejemplo "col-12 col-lg-6"');
  const fila = columna.parentElement;
  const centrada = (fila && fila.classList.contains("justify-content-center")) || [...columna.classList].some((c) => /^offset-/.test(c) || c === "mx-auto");
  assert.ok(centrada, 'la fila del formulario debería tener la clase justify-content-center para centrar la columna');
});
