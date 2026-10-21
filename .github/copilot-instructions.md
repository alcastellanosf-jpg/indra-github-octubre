# Instrucciones del proyecto

## Contexto

- Es una página estática en español, hecha con HTML, CSS y JavaScript nativo. No añadas frameworks, dependencias ni herramientas de compilación salvo que la tarea lo requiera expresamente.
- `index.html` contiene la estructura, `styles.css` los estilos y `script.js` la interacción. Mantén esta separación y los enlaces entre archivos.
- Consulta [README.md](../README.md) para conocer las funcionalidades y cómo ejecutar la página.

## Convenciones de implementación

- Conserva el idioma español en la interfaz y usa `lang="es"` en el documento.
- Prefiere HTML semántico y controles nativos. Mantén etiquetas accesibles, nombres descriptivos y anuncios `aria-live` para contenido que cambia dinámicamente.
- Mantén el diseño adaptable existente, incluidos los ajustes para pantallas pequeñas y los estados visibles de foco y hover.
- En JavaScript, utiliza las APIs del navegador y el estilo existente: `const`/`let`, funciones claras, eventos DOM y atributos `data-*` para las teclas de la calculadora.
- Evita duplicar lógica o introducir complejidad que no sea necesaria para una página pequeña.

## Validación

- No hay instalación, compilación ni suite de pruebas configurada. Para validar cambios, abre `index.html` en un navegador y comprueba el comportamiento afectado.
- Comprueba especialmente que los mensajes, el reloj y las operaciones de la calculadora sigan funcionando, y revisa la presentación en móvil cuando cambies estilos.