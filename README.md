# News Explorer — Front-end

Aplicación full stack en la que los usuarios buscan artículos de noticias y los
guardan en su perfil. Este repositorio contiene el **front-end** (React + Vite).

## Características

- **Búsqueda de noticias**: el usuario introduce una palabra clave y la app
  muestra una lista de tarjetas con los artículos relevantes de la última semana.
- **Encabezado dinámico**: la barra de navegación se muestra de forma diferente
  para usuarios conectados (enlace «Artículos guardados» + nombre con botón de
  cerrar sesión) y no conectados (botón «Iniciar sesión»).
- **Dos ventanas modales**: formulario de registro y formulario de acceso, con
  validación en vivo y un modal de confirmación tras el registro.
- **Página de artículos guardados** (ruta protegida): muestra todos los
  artículos a los que el usuario ha dado «me gusta», con su palabra clave y la
  opción de eliminarlos.
- Diseño responsive (escritorio, tablet y móvil con menú hamburguesa).

## Cómo ejecutar

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # build de producción en /dist
npm run preview  # sirve el build de producción
```

## Estructura

```
src/
├── components/        # un componente por carpeta, con su CSS
│   ├── App/           # estado global, rutas, handlers de auth y búsqueda
│   ├── Header/        # encabezado + hero (sólo en home)
│   ├── Navigation/    # nav dinámica (logueado / no logueado)
│   ├── SearchForm/    # barra de búsqueda
│   ├── Main/          # resultados de búsqueda + sección «Sobre el autor»
│   ├── NewsCardList/  # grid de tarjetas
│   ├── NewsCard/      # tarjeta (guardar / eliminar, tooltip)
│   ├── SavedNews/     # página de artículos guardados
│   ├── PopupWithForm/ # base reutilizable de los modales
│   ├── LoginModal/    # formulario de acceso
│   ├── RegisterModal/ # formulario de inscripción
│   ├── InfoTooltip/   # confirmación de registro
│   └── ...            # About, Footer, Preloader, NotFound, ProtectedRoute
├── fonts/             # fuentes locales (Inter, Roboto Slab) + @font-face
├── images/            # iconos e imágenes en SVG
├── contexts/
│   └── CurrentUserContext.js
└── utils/
    ├── constants.js   # configuración central (endpoints + USE_MOCK)
    ├── NewsApi.js     # búsqueda de noticias (mock o NewsAPI real)
    ├── MainApi.js     # auth + artículos guardados (mock o backend real)
    └── mockData.js    # generador de artículos simulados
```

> **Nota sobre la infraestructura:** la rúbrica menciona CRA, pero el proyecto
> usa **Vite** (más rápido y la opción vigente en TripleTen). Si tu cohorte
> exige CRA estrictamente, avísame y migro la configuración.

## Modo simulado (mock) vs. backend real

Actualmente la app funciona **sin backend**: la autenticación y los artículos
guardados se simulan con `localStorage`, y las búsquedas devuelven artículos
generados localmente. Esto está controlado por una sola bandera:

```js
// src/utils/constants.js
export const USE_MOCK = true; // ← cambiar a false cuando el backend esté listo
```

Al poner `USE_MOCK = false`, los módulos `NewsApi.js` y `MainApi.js` pasan a usar
`fetch()` contra:

- `MAIN_API_BASE_URL` — tu API propia de autenticación y almacenamiento
  (`/signup`, `/signin`, `/users/me`, `/articles`).
- `NEWS_API_BASE_URL` — la News API de terceros (idealmente a través de un proxy
  en tu propio backend para no exponer la clave).

No hace falta tocar los componentes: las firmas de las funciones del API son las
mismas en ambos modos.

## Palabras clave especiales del mock

Para probar los distintos estados de la búsqueda:

- `vacio` → estado «Nada encontrado».
- `error` → estado de error de la solicitud.
- cualquier otra palabra → 12 tarjetas de ejemplo.
