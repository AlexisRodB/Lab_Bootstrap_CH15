# 🧺 Taller de Bootstrap · Sabores de la Plaza

Generation Colombia · Cohorte 15 · Bootstrap 5 · Taller calificable

---

## 🧭 ¿Qué es esto?

### El encargo del cliente

**Sabores de la Plaza** es un colectivo de puestos de una plaza de mercado: fruteros, una panadería, un puesto de almuerzos, jugos naturales y café.
Quieren un sitio para que la gente los conozca, vea lo que ofrecen y les escriba para hacer pedidos.

### Lo que dijo el cliente, con sus palabras

- «Que se sienta moderno y ordenado, no un sitio recargado.»
- «Que se vea bien en el celular: casi toda nuestra gente entra desde el teléfono.»
- «Varias páginas: una de bienvenida, una con nuestros puestos y una para contactarnos.»
- «Nuestros propios colores, no el azul de todos los sitios. Y una letra cálida.»
- «Que la gente pueda dejarnos sus datos para pedidos, sin tener que llamar.»
- «Algo con fotos que pasen solas, para mostrar los platos.»

### Tu primer trabajo es traducir

El cliente no habla de clases ni de breakpoints. Habla de sensaciones.
Cuando dice «que en el celular no se amontone», está pidiendo un diseño **responsive**: en pantalla pequeña las cosas se apilan; en pantalla grande se reparten.

### Las reglas del taller

- Todo se construye con **Bootstrap 5**: su grilla, sus componentes y su JavaScript.
- **No escribes ni una línea de JavaScript propio.** Lo interactivo lo hace Bootstrap con atributos `data-bs-*`.
- Tu CSS va en `styles.css`, **después** del de Bootstrap.

### La calificación es automática

Cada vez que subes tu código, GitHub corre unos **tests** que abren tus tres páginas en un navegador simulado y las revisan.
En pocos minutos ves tu nota de **0.0 a 5.0** y qué te falta corregir.

### ¿Qué es un test?

**Definición técnica:** un test es un código que abre tus páginas, busca las etiquetas, clases y atributos que pide el enunciado, lee tu `styles.css` y compara con lo esperado.

**En la vida real:** es como la revisión técnico-mecánica de un carro. Un inspector revisa punto por punto; si algo falla, te dice exactamente qué.

### Lo que los tests NO revisan

Los tests revisan **la estructura**: que la grilla sume 12, que el botón apunte al id correcto, que tu color reemplace al azul.
No pueden juzgar si tu sitio **se ve bonito**. Eso lo revisas tú, abriéndolo con Live Server en el celular y en el computador.

---

## 📋 Los 8 ejercicios

### Tabla general

Los 8 ejercicios construyen **un solo sitio de tres páginas**, en la carpeta `plaza/`.

| # | Tema | Archivo(s) | Lo que debes hacer |
|---|---|---|---|
| 01 | Bootstrap instalado | las 3 páginas | `viewport`, CSS de Bootstrap, `styles.css` después y el `script` al final del `body` |
| 02 | Barra de navegación | las 3 páginas | `navbar` idéntica, con marca, botón del celular y enlaces a las 3 páginas |
| 03 | Página de inicio | `plaza/index.html` | banner con `h1` y botón, 3 o 4 bloques de presentación, `footer` |
| 04 | Puestos y tarjetas | `plaza/puestos.html` | lateral angosto + contenido ancho, 5 categorías y al menos 4 tarjetas |
| 05 | Distintivos y precios | `plaza/puestos.html` | 3 `badge` de color y una tabla de precios |
| 06 | Formulario de pedidos | `plaza/contacto.html` | formulario con `label` conectados, centrado en pantalla grande |
| 07 | Componentes de la doc | cualquiera de las 3 | carrusel, acordeón y un modal o unas pestañas |
| 08 | Identidad visual | `plaza/styles.css` y las 3 páginas | tu color principal, tus botones y tu fuente de Google Fonts |

### ¿Dónde está el enunciado?

Al inicio de cada archivo de `plaza/`, en un comentario.
Ahí están las reglas exactas de cada ejercicio.

### Los ejercicios 05 y 07 son "a cazar en la documentación"

Algunas piezas no las vimos en clase: el carrusel, los distintivos, la tabla, el modal.
No te voy a decir cómo se hacen: el enunciado te dice qué necesita el cliente y en qué sección de la documentación oficial está.
Esa es la habilidad profesional que estás practicando.

### Antes de copiar un ejemplo de la documentación

Léelo y pregúntate: ¿qué parte es la **estructura** que debo respetar (las clases, los `data-bs-*`, los `id`) y qué parte es el **contenido** que cambio por el mío?
Entender esa diferencia es lo que separa copiar de diseñar.

### Las fotos del carrusel

En `plaza/img/` tienes tres imágenes listas: `frutas.svg`, `pan.svg` y `cafe.svg`.
Puedes usar otras, siempre que cada una tenga su `alt`.

### Tu guía de apoyo

La guía de la clase de Bootstrap (el sitio de Café Origen) tiene casi **todo** lo que necesitas.
Si te bloqueas, búscala ahí y en la documentación antes de preguntarle a la IA.

---

## ⏰ Fecha límite

### Cuándo cierra

La profe te indica el día y la hora de cierre.

### Qué pasa después

Después de esa hora puedes seguir haciendo `git push`, pero **tu nota ya no cambia**.
Si abres tu Pull Request por primera vez después del cierre, queda con la etiqueta **⏰ Fuera de plazo**.

---

## 🚀 Paso 1 · Crea tu copia del repo (Fork)

### ¿Qué es un Fork?

**Definición técnica:** un fork es una copia de un repositorio en tu propia cuenta de GitHub. Puedes modificarla sin afectar el original.

**En la vida real:** la profe tiene el cuaderno original y tú le sacas fotocopia. Escribes en tu fotocopia, no en el cuaderno de la profe.

### Cómo hacerlo

1. Entra al repositorio de la profe en GitHub.
2. Arriba a la derecha, haz clic en **Fork**.
3. Deja todo como está y haz clic en **Create fork**.

### Cómo saber que quedó bien

Arriba a la izquierda debe decir **TU-USUARIO / Lab_Bootstrap_CH15**.
Debajo aparece en letra pequeña: *forked from …*

---

## 💻 Paso 2 · Descarga tu copia al computador (Clone)

### Copia la dirección de TU fork

En **tu** fork (no en el de la profe), haz clic en el botón verde **Code** y copia la URL que termina en `.git`.

### Clona desde VS Code

Abre la terminal de VS Code (`Ctrl + ñ` o menú **Terminal → New Terminal**), ubícate en la carpeta donde guardas tus proyectos y escribe esto. Cambia la URL por la que copiaste:

```bash
git clone https://github.com/TU-USUARIO/Lab_Bootstrap_CH15.git
```

### Abre la carpeta del proyecto

Entra a la carpeta que se acaba de crear y ábrela en VS Code:

```bash
cd Lab_Bootstrap_CH15
code .
```

### Instala las herramientas de los tests (una sola vez)

Igual que en el taller del vivero, los tests necesitan un **navegador simulado** llamado *jsdom*.
En la terminal, dentro de la carpeta del proyecto, escribe:

```bash
npm install
```

Aparece una carpeta `node_modules`. No la toques: es de los tests y nunca se sube a GitHub.

---

## ✍️ Paso 3 · Construye el sitio

### Dónde escribes tu código

Todo va dentro de la carpeta `plaza/`, **debajo** del comentario del enunciado de cada archivo:

- `index.html` → la página de inicio.
- `puestos.html` → el catálogo de puestos.
- `contacto.html` → el formulario de pedidos.
- `styles.css` → la identidad visual.

### Mira tu sitio mientras trabajas

Clic derecho sobre `plaza/index.html` → **Open with Live Server**.
Para ver cómo se ve en el celular: `F12` y luego `Ctrl + Shift + M`.

### Reglas de oro

- **No le cambies el nombre** a los archivos ni a la carpeta `plaza/`.
- **Los enlaces entre páginas van exactos:** `index.html`, `puestos.html` y `contacto.html`.
- **La barra de navegación es la misma en las tres páginas:** hazla una vez y cópiala igual.
- **Cero JavaScript propio:** ni `<script>` tuyos ni atributos como `onclick`.

### Copia de la documentación, pero solo de la versión 5.3

Trae las piezas de [getbootstrap.com/docs/5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/).
Si llegas a una página de Bootstrap 4 desde un buscador, las clases cambian y algunos tests fallarán.

---

## 🧪 Paso 4 · Prueba tu nota en tu computador

### Corre todos los tests

En la terminal de VS Code, dentro de la carpeta del proyecto, escribe:

```bash
npm test
```

### Cómo leer el resultado

- ✅ el ejercicio pasó todos sus tests
- 🟡 pasó algunos tests
- ❌ no pasó ninguno
- Debajo de cada ✗ aparece **qué** esperaba el test

Al final ves tu **nota de 0.0 a 5.0**. Es la misma que te va a poner GitHub.

### Corre un solo ejercicio

Si quieres revisar solo uno, agrega su número. Por ejemplo, para el 04:

```bash
npm test -- 04
```

---

## ☁️ Paso 5 · Sube tu código a tu fork

### Los 3 comandos de siempre

Cada vez que quieras guardar tu avance en GitHub, corre estos 3 comandos en orden:

```bash
git add .
git commit -m "Construyo la página de puestos"
git push
```

### ¿Qué hace cada uno?

- `git add .` → prepara todos tus cambios (como meter las cosas en una caja).
- `git commit -m "..."` → cierra la caja y le pone una etiqueta con un mensaje.
- `git push` → envía la caja a tu fork en GitHub.

---

## 📬 Paso 6 · Entrega: abre tu Pull Request (solo UNA vez)

### ¿Qué es un Pull Request?

**Definición técnica:** un Pull Request (PR) es una solicitud para proponer tus cambios al repositorio original. Ahí se revisan y se comentan.

**En la vida real:** es como radicar un documento en una oficina. Lo entregas una vez, queda con número de radicado, y cualquier corrección se agrega a ese mismo trámite.

### Cómo abrirlo

1. Entra a **tu fork** en GitHub.
2. Haz clic en **Contribute** y luego en **Open pull request**.
3. En el título escribe tu **nombre y apellido completos**. Por ejemplo: `Laura Gómez Pérez`.
4. Haz clic en **Create pull request**.

### Muy importante

**Abre un solo PR.** Cuando hagas `git push` otra vez, tu PR se actualiza solo y se vuelve a calificar.
No hace falta abrir uno nuevo.

---

## 🎯 Paso 7 · Mira tu nota en GitHub

### Dónde aparece

Espera 1 o 2 minutos después de cada `git push` y entra a tu Pull Request:

- Aparece un **comentario automático** con tu nota y una tabla por ejercicio.
- A la derecha verás una etiqueta, por ejemplo **Nota 4.2**.
- El enlace **Ver qué falta por corregir** te muestra qué tests fallaron.

### ¿Quieres subir la nota?

Corrige en VS Code, revisa con `npm test` y haz de nuevo el **Paso 5**.
El comentario y la etiqueta se actualizan solos.

### Ojo con la fecha límite

Después del cierre, los `git push` ya no cambian tu nota.
Si tu primera entrega llega tarde, el PR queda con **⏰ Fuera de plazo**.

---

## 🤖 Reto opcional · La IA como revisora

### Qué hacer

Cuando tu sitio ya tenga 5.0, pídele a una IA que revise **una** de tus páginas:

> "Estoy aprendiendo Bootstrap 5.3 y esta es la página de puestos de un sitio. Revisa solamente si las clases de la grilla y de las tarjetas están bien usadas y si hay problemas de accesibilidad. No reescribas mi código: dime qué mejorarías y por qué, en máximo 5 puntos."

### Lo que no se delega

Antes de aplicar una sugerencia, búscala en la documentación de Bootstrap 5.3.
Lo que no puedas explicar con tus palabras no entra a tu código. Este reto no cambia tu nota.

---

## 🚫 Archivos que NO debes modificar

### La lista

- La carpeta `tests/`
- La carpeta `scripts/`
- La carpeta `.github/`
- Los archivos `package.json` y `package-lock.json`

### ¿Qué pasa si los modificas?

Tu PR queda marcado con la etiqueta **⚠️ Revisar** y la profe lo revisa a mano.
Además, GitHub siempre califica con los tests originales, así que modificarlos no cambia tu nota.

---

## 🆘 Errores frecuentes

### "npm no se reconoce como un comando"

No tienes Node.js instalado, o VS Code se abrió antes de instalarlo.
Instálalo desde [nodejs.org](https://nodejs.org) (versión LTS) y reinicia VS Code.

### "Faltan las herramientas de los tests: corre npm install"

Te saltaste la última parte del **Paso 2**. Corre `npm install` una vez y vuelve a correr `npm test`.

### "No encuentro plaza/… no le cambies el nombre ni la carpeta"

Renombraste o moviste un archivo. Los tres HTML y el CSS deben estar dentro de `plaza/` con su nombre original.

### "… apunta a data-bs-target="#…", pero no hay ningún elemento con ese id"

El botón y lo que abre no coinciden. Compara letra por letra: en `data-bs-target` va **con** `#`; en el `id` va **sin** `#`.

### "la navbar de … debería tener los mismos enlaces … que la de index.html"

Tus barras no son iguales: falta un enlace, cambia un texto o el orden es distinto.
Copia la `navbar` completa de `index.html` y pégala igual en las otras dos páginas.

### "… deberían sumar exactamente 12"

Revisa los números de tus columnas en pantalla grande. Con 3 bloques iguales, ¿cuánto es 12 ÷ 3?

### "el <link> a styles.css debería ir DESPUÉS del de Bootstrap"

Si tu CSS va antes, Bootstrap se carga después y pisa tus cambios. Cambia el orden en el `<head>`.

### "--bs-primary-rgb tiene el azul de Bootstrap"

Bootstrap guarda el color principal dos veces: en hexadecimal (`--bs-primary`) y en números (`--bs-primary-rgb`).
Las clases `bg-primary` y `text-primary` usan la versión en números. Cambia las dos con el mismo color.

### "…si sí la escribiste, revisa que la regla de arriba cierre su llave }"

Una regla de CSS sin su `}` hace que el navegador ignore las reglas que vienen después.
Revisa la regla que está **justo arriba** de la que el test no encuentra.

### "Please tell me who you are" al hacer commit

Git no sabe quién eres. Configúralo una sola vez con tu nombre y el correo de tu cuenta de GitHub:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tucorreo@ejemplo.com"
```

### "Permission denied" o error 403 al hacer push

Clonaste el repo de la profe en vez de tu fork.
Vuelve al **Paso 2** y clona la URL de **tu** fork.

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
