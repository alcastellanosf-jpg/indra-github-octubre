# Mi página web

Una página web sencilla e interactiva creada con HTML, CSS y JavaScript. Incluye una tarjeta de bienvenida, un reloj analógico que muestra la hora local y una calculadora básica.

## Funcionalidades

- **Mensajes de bienvenida:** pulsa «Ver otro mensaje» para recorrer los mensajes disponibles.
- **Reloj analógico:** muestra la hora local y actualiza sus agujas cada segundo.
- **Calculadora:** permite sumar, restar, multiplicar y dividir, además de introducir decimales, borrar el último dígito y limpiar la operación. La división entre cero muestra un error.
- **Diseño adaptable:** la distribución se ajusta a pantallas pequeñas.
- **Accesibilidad básica:** los controles son botones HTML y los cambios de mensaje y resultado se anuncian mediante regiones accesibles.

## Tecnologías

- HTML5
- CSS3
- JavaScript

No requiere dependencias ni un proceso de compilación.

## Cómo ejecutar el proyecto

Abre `index.html` en un navegador moderno. También puedes usar la extensión Live Server de Visual Studio Code para servir la página localmente.

## Estructura del proyecto

```text
mi-web/
├── index.html   # Estructura y contenido de la página
├── styles.css   # Estilos y diseño adaptable
├── script.js    # Mensajes, reloj y lógica de la calculadora
└── README.md    # Documentación del proyecto
```

## Desarrollo

La página carga `styles.css` para los estilos y `script.js` con `defer`, de modo que el JavaScript se ejecuta cuando el HTML ya está disponible.
