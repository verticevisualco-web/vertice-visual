# Vértice Visual — Sitio Web

Sitio web oficial de **Vértice Visual**, productora audiovisual colombiana con sede en Bucaramanga, Santander.

## 🌐 Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio — Presentación y proyectos destacados |
| `/proyectos.html` | Portafolio de proyectos |
| `/servicios.html` | Servicios y precios "desde" (editar `PRECIOS` al final del archivo) |
| `/politica-datos.html` | Política de Tratamiento de Datos (Ley 1581) |
| `/rental.html` | Catálogo de equipos en alquiler |
| `/nosotros.html` | Quiénes somos |
| `/contacto.html` | Formulario de contacto |

## 🚀 Correr localmente

Requiere [Node.js](https://nodejs.org/) instalado.

```bash
# Instalar dependencias (ninguna en este proyecto)
# Solo ejecutar el servidor:
node server.js
```

Si cambias clases de Tailwind en los HTML: `npm install` una vez y luego `npm run build:css` (genera `public/css/tailwind.css`).

Luego abrir el navegador en: [http://localhost:3000](http://localhost:3000)

## 📁 Estructura

```
vertice-visual/
├── public/
│   ├── index.html
│   ├── proyectos.html
│   ├── rental.html
│   ├── nosotros.html
│   ├── contacto.html
│   └── images/          # Imágenes del sitio
├── server.js            # Servidor HTTP local (Node.js)
├── package.json
├── .gitignore
└── README.md
```

## ✉️ Contacto

- Instagram: [@vertice.visual](https://www.instagram.com/vertice.visual/)
- Correo: vertice.visual.co@gmail.com

---

© 2026 Vértice Visual. Todos los derechos reservados.
