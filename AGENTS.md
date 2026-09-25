<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Fuccina

Instrucciones operativas para los agentes de IA que trabajan en este repositorio.
Antes de escribir o revisar código, lee las secciones **Contexto**, **Sistema de diseño** y **Reglas**.

---

## 1. Contexto de la empresa

### Qué es Fuccina

Fuccina es una compañía de vanguardia que desarrolla soluciones tecnológicas de alto impacto
para el **sector e-commerce y el entorno empresarial**. La propuesta no es vender software
suelto: es vender *infraestructura de crecimiento*.

Posicionamiento de marca (el que la landing debe comunicar de forma consistente):

> **"La infraestructura invisible de tu crecimiento."**
> Más ventas. Menos fricción.

Pilares de la propuesta de valor, en el orden en que aparecen en el sitio:

1. **Genera clientes** — adquisición y conversión.
2. **Recupera ganancia** — venta de carritos que ya se habían perdido.
3. **Crea reputación** — reseñas y tickets gestionados post-compra.

### Producto flagship: Slancio

Slancio ataca uno de los mayores problemas del comercio digital: el **abandono del carrito
de compra**. No es un discount widget genérico; el diferencial es el **token**.

- **Funcionalidad core:** detección y recuperación de carritos mediante la generación de
  **tokens personalizados**, altamente configurables.
- **Los incentivos se configuran en función de:**
  - **Perfil del comprador** — diferenciación entre usuarios nuevos y recurrentes.
  - **Contenido del carrito** — reglas basadas en cantidad de productos o categorías específicas.
- **Dashboard interactivo** con métricas en tiempo real, estadísticas de recuperación e
  historial detallado, para optimizar la conversión con datos precisos.

> Cuando escribas copy o UI sobre Slancio, habla de **recuperación de ingresos con reglas
> por segmento**, no de "cupones de descuento". Es la diferencia entre un producto y un plugin.

### Producto secundario: Faro (post-compra)

Faro no aparece en el documento operativo (que es anterior a su lanzamiento) pero **ya está
publicado en la landing**, así que es parte de la oferta vigente:

- Consulta automáticamente cómo fue la experiencia después de cada compra.
- Si la experiencia fue **positiva** → invita al cliente a dejar una **reseña**.
- Si fue **negativa** → ofrece al cliente abrir un **ticket** directamente con la tienda.

Nomenclatura comercial en uso: **Slancio** (producto 01) y **Faro** (producto 02),
comunicados juntos como *"Dos motores. Un objetivo."*

### Objetivo de este repositorio

El objetivo **primordial y exclusivo** de este equipo de agentes es el **diseño, desarrollo,
testeo y despliegue integral de la nueva Landing Page oficial de Fuccina**.

Cualquier cambio fuera de ese alcance debe señalarse explícitamente, no|colarse de forma
silenciosa en un PR de la landing.

---

## 2. Roles de agentes IA

El proyecto se ejecuta bajo tres roles definidos. Cada agente asume uno (o declara
explícitamente cuál está cubriendo) y respeta los límites de su responsabilidad.

### Rol 1 — QA Specialist (Aseguramiento de Calidad)

**Objetivo:** garantizar la calidad técnica y funcional de la landing, asegurando una
experiencia de usuario sin errores y un rendimiento óptimo en todos los entornos.

**Responsabilidades exclusivas:**

- Pruebas de diseño responsivo en escritorio, tablet y móvil.
- Compatibilidad entre navegadores y auditoría de rendimiento (**Core Web Vitals**, velocidad de página).
- Validación de **formularios de captura de leads**, botones CTA, enlaces e integraciones de contacto.
- Auditorías de **accesibilidad web** y cumplimiento de estándares de navegación.

**Entregables:** informes de bugs detallados, scripts de automatización de pruebas,
matriz de cumplimiento de reglas de negocio de Slancio.

### Rol 2 — UI/UX Designer (Diseñador de Experiencia e Interfaz)

**Objetivo:** definir la identidad visual y la arquitectura de información de la landing
para maximizar la conversión y comunicar eficazmente la propuesta de valor de Fuccina.

**Responsabilidades exclusivas:**

- Diseño visual de alta fidelidad y wireframing: hero, propuesta de valor, exhibición de
  Slancio, maqueta de demo interactiva, testimonios, planes de precios y llamada a la acción.
- Diseños responsivos **mobile-first** y generación de activos visuales (iconos, elementos de marca).
- **UX copywriting** enfocado en los servicios de Fuccina y el showcase estratégico de Slancio.
- Optimización de la tasa de conversión (**CRO**) mediante diseño persuasivo de elementos de captación.

**Entregables:** wireframes y prototipos de alta fidelidad, guía de estilo y librería de
componentes UI, mapas de calor y flujos de usuario validados.

### Rol 3 — Full Stack Developer

**Objetivo:** desarrollar la arquitectura técnica de la landing, priorizando velocidad de
carga, SEO y robustez de las integraciones de backend.

**Responsabilidades exclusivas:**

- Desarrollar y optimizar la landing en **Next.js + Tailwind**, respetando las directivas de diseño.
- Optimización **SEO**, tiempos de carga rápidos, despliegue y configuración de dominio.

**Entregables:** repositorios documentados y limpios, documentación de API interna y externa,
arquitectura de base de datos optimizada.

### Guía de interacción (system prompts de referencia)

| Rol | Prompt de referencia |
|---|---|
| QA Specialist | Actúa como un Senior QA Engineer especializado en optimización web. Tu enfoque es el rendimiento (Core Web Vitals), la compatibilidad multi-dispositivo y la integridad de los flujos de conversión de la Landing Page de Fuccina. |
| UI/UX Designer | Actúa como un Diseñador de Producto con enfoque en Marketing de Conversión para SaaS. Tu objetivo es crear una Landing Page visualmente impactante que convierta visitantes en leads, utilizando los estándares de marca de Fuccina. |
| Full Stack Developer | Actúa como un Desarrollador Full Stack experto en performance web. Prioriza la implementación técnica de la Landing Page con Next.js, asegurando una puntuación SEO perfecta, carga instantánea y seguridad en la gestión de leads. |

---

## 3. Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | **Next.js 16** (App Router) |
| UI runtime | **React 19** |
| Estilos | **Tailwind CSS v4** ( `@tailwindcss/postcss`, configuración en CSS, sin `tailwind.config.js`) |
| Componentes | **shadcn/ui** — estilo `base-nova` sobre `@base-ui/react`, iconos `lucide-react` |
| Lenguaje | **TypeScript** estricto (`strict: true`) |
| Paquetes | **pnpm** |
| Email | **nodemailer** (SMTP) |
| Animación | **framer-motion** — sólo en Client Components; la escala sale de `globals.css` |
| Analítica | `@vercel/analytics` (solo en producción) |

Alias de import: `@/*` → raíz del proyecto. Ejemplos: `@/components/ui/button`, `@/lib/utils`.

> **Ojo con la versión de Next.js.** Este proyecto corre una versión reciente cuyas APIs y
> convenciones pueden diferir de tu conocimiento previo. Antes de escribir código, lee la guía
> correspondiente en `node_modules/next/dist/docs/`. No asumas la API de versiones anteriores.

---

## 4. Sistema de diseño

### Tema

- **Modo oscuro únicamente.** No hay tema claro; `color-scheme: dark` es global.
- Todos los colores se definen como **variables CSS en OKLCH** dentro de `app/globals.css`.
  **Nunca hardcodees un hex en un componente** — usá los tokens semánticos de Tailwind
  (`bg-background`, `text-muted-foreground`, `text-primary`, `border-border`...).

### Tokens clave

| Token | Valor | Uso |
|---|---|---|
| `--background` | `oklch(.115 .012 90)` | Fondo casi negro cálido |
| `--foreground` | `oklch(.96 .012 90)` | Texto principal |
| `--primary` | `oklch(.76 .16 70)` | **Naranja de marca** — CTAs, acentos, glows |
| `--muted-foreground` | `oklch(.62 .015 90)` | Texto secundario |
| `--border` | `oklch(1 0 0 / 10%)` | Bordes sutiles |
| `--radius` | `.7rem` | Radio base; variantes derivadas (`sm`/`md`/`lg`/`xl`/`2xl`) |

### Clases utilitarias propias (definidas en `globals.css`)

Usarlas en lugar de reescribir el CSS a mano:

- `.eyebrow` — micro-label monoespaciado uppercase con punto de estado en `primary`.
- `.title-glow` — halo radial naranja difuminado detrás de titulares.
- `.module-card` — tarjeta de producto con borde y hover sutil.
- `.icon-box` — contenedor cuadrado para iconos de producto.
- `.module-number` — numeración monoespaciada (`01 / SLANCIO`).
- `.dashboard-shell` — fondo con grilla, usado para la maqueta del dashboard de Slancio.
- `.panel` / `.panel-hover` — tarjeta con gradiente interno y borde que se marca al hover.
- `.bracket` / `.bracket-hover` — corchetes de encuadre de marca.
- `.section-index` / `.section-h2` / `.section-pad` — ritmo de sección.
- `.btn-outline` / `.field` — botón y campo de formulario.
- `.tap-target` (44px) / `.tap-icon` (44×44px) — **área táctil mínima**. Usarlas en
  todo control que se pulse con el dedo; los CTA primarios usan `min-h-12` (48px).
- `.scroll-target` — `scroll-margin` para que el header fijo no tape el destino de un ancla.

> **Regla de cascada — las utilidades de marca nuevas van en `@layer components`.**
> Tailwind declara `@layer theme, base, components, utilities`, y el orden de las
> capas gana sobre el orden del archivo. Una clase escrita suelta al final de
> `globals.css` compite con cualquier utility en igualdad de especificidad y
> **gana por posición**: eso hizo que `.tap-icon` (`display: inline-flex`)
> pisara al `md:hidden` del botón de menú y el menú de móvil apareciera en
> escritorio. Dentro de `@layer components`, cualquier utility pisa a la clase
> de marca, que es lo correcto: la clase da el valor por defecto y la utility
> ajusta el caso puntual.
>
> **Consecuencia pendiente de revisar:** las clases del sistema visual que están
> **fuera** de toda capa (`.panel`, `.bracket`, `.btn-outline`, `.field`, …)
> ganan sobre cualquier utility que compita. Hoy eso deja código muerto: las
> tarjetas de integraciones llevan `p-4 sm:px-4` en el JSX, pero `.panel`
> impone `p-6 sm:p-8` después. No se movieron a `components` porque hacerlo
> cambiaría el padding visible de esas tarjetas y eso es una decisión de diseño.

### Movimiento

- **El motor es framer-motion.** `MotionConfig reducedMotion="user"` respeta
  `prefers-reduced-motion`; los `@media (prefers-reduced-motion: reduce)` de
  `globals.css` hacen lo propio para las transiciones CSS.
- La **escala de tiempos y curvas no se inventa**: `components/site/motion.tsx`
  replica las custom properties `--motion-ease-out`, `--motion-ease-in`,
  `--motion-fast`, `--motion-base` y `--motion-reveal`. Si el Rol 2 cambia esos
  tokens, hay que cambiarlos en los dos lugares.
- Sólo se animan `opacity` y `transform` (capas de compositor). Nada de animar
  `height`, `width`, `top` ni `box-shadow` en scroll: matan el hilo principal.
- `globals.css` conserva un sistema de movimiento en CSS (`.reveal`, `.is-in`,
  `.panel-lift`, `.card-rule`, `.shake`, …). Las clases de scroll-reveal
  (`.reveal` / `.is-in`) quedaron **sin uso**: ese rol lo cumple hoy
  `components/site/reveal.tsx` con `whileInView`. Las demás siguen en pie y las
  puede adoptar el Rol 2 para estados de formulario.
- Sin JavaScript, framer-motion no corre y todo lo que arranca en `opacity: 0`
  quedaría invisible. Por eso **todo elemento animado con estado inicial oculto
  lleva el atributo `data-motion-hidden`**, y el `<noscript>` de `app/layout.tsx`
  lo fuerza a `opacity: 1`. Si se agrega una animación de entrada y se olvida
  marcar el elemento, desaparece sin JS. **No borrar ese `<noscript>`.**

### Tipografía

- **Producción:** `Geist` (texto) + `Geist Mono` (labels, datos, micro-copy), cargadas
  vía `next/font/google` en `app/layout.tsx`.
- **Pendiente de decisión:** el documento operativo de marca especifica **Inter** y
  **Montserrat**. Si el cambio de tipografía es parte del scope, es una tarea del
  Rol 2 (UI/UX) y debe cubrir todo el árbol tipográfico, no solo el hero.

### Voz y tono

- Español rioplatense, directo y sin relleno. Frases cortas.
- Orientado a resultados, no a features: *"Recupera lo que ya era tuyo"*, no *"Módulo de
  recuperación de carritos v2"*.
- Titles en `text-balance`, párrafos en `text-pretty`, tracking negativo en titulares
  (`tracking-[-.04em]` a `[-.055em]`).

---

## 5. Estructura y convenciones

```
app/
  layout.tsx            # metadata, fuentes, <html lang="es">, <noscript>, MotionProvider
  page.tsx              # Server Component: compone las secciones, sin JS propio
  globals.css           # tokens de tema + utilidades de marca + escala de movimiento
  icon.svg
  api/contact/
    route.ts            # endpoint POST de captura de leads
    mailer.ts           # envío SMTP (aviso al negocio + auto-respuesta al lead)
components/
  ui/                   # primitivas shadcn
  site/
    data.ts             # contenido: navItems, plans, integraciones, pilares
    motion.tsx          # MotionProvider (LazyMotion) + escala de tiempos compartida
    reveal.tsx          # entrada al entrar en viewport (envuelve Server Components)
    header.tsx          # Client Component: navegación y menú móvil
    hero-actions.tsx    # Client Component: CTAs del hero + fila de pilares
    contact-form.tsx    # Client Component: formulario de leads
    logo.tsx            # compartido server/client
    use-body-scroll-lock.ts
    sections/           # Server Components: hero, product, integrations,
                        # pricing, contact, footer
lib/
  utils.ts              # helper `cn()`
  contact-limits.ts      # CONTACT_LIMITS: fuente única de los límites por campo
public/                 # logos de integraciones
docs/                   # documentación operativa de la empresa
```

- **Frontera server/client.** `app/page.tsx` es un Server Component que compone
  todo. Sólo hay JavaScript de cliente donde hay estado real: `header.tsx`
  (menú móvil), `contact-form.tsx` (envío) y los componentes de animación
  (`motion.tsx`, `reveal.tsx`, `hero-actions.tsx`). Las secciones y sus
  textos se renderizan en el servidor y llegan al HTML.
- `Reveal` es un Client Component que recibe Server Components como `children`:
  eso es lo que permite animar sin volver cliente la sección entera. Sus props
  tienen que ser serializables (números, strings, `className`).
- **Secciones actuales** de la landing, con sus IDs (usados por el nav y por
  enlaces ancla): `#producto` (Slancio + Faro), `#como-funciona`,
  `#integraciones`, `#precios`, `#contacto`. Todas con `.scroll-target` para
  compensar el header fijo.
- Estilos con **Tailwind utilities en línea**; no agregar CSS nuevo salvo que sea
  una utilidad de marca reutilizable, y en ese caso va en `globals.css`.
- Imágenes: `next/image` con `width`/`height` explícitos y `alt` descriptivo en español.

### Navegación móvil

`components/site/header.tsx` concentra el comportamiento. Si se lo toca, mantener:

- `aria-expanded` + `aria-controls` en el botón, apuntando al panel.
- `Escape` cierra el panel y **devuelve el foco** al botón.
- Al pasar a `md` con el panel abierto, se cierra solo (si no, el `body` queda
  con `overflow: hidden` y la página no scrollea en escritorio).
- El scroll se bloquea con `use-body-scroll-lock`, que compensa el ancho de la
  barra. Al navegar a un ancla hay que llamar **`release()` antes** de cerrar:
  con `overflow: hidden` puesto, el navegador no puede desplazar la página.
- Área táctil: 44px mínimo (`.tap-target` / `.tap-icon`), 56px en los ítems de
  la lista del menú.

### Datos de negocio — no inventar

Planes publicados actualmente. Son **datos reales**: si cambian, los cambia quien lo decida,
nunca el agente por su cuenta.

| Plan | Precio | Volumen / alcance |
|---|---|---|
| Slancio · Inicio | $30/mes | Hasta 500 carritos recuperados por mes |
| Slancio · Escala | $50/mes | Hasta 1.000 carritos recuperados por mes — *Más elegido* |
| Faro | $30/mes | Gestión de reseñas y ruteo inteligente de opiniones |

Integraciones publicadas: **Shopify**, **TiendaNube**, **Google Analytics**. No prometas
integraciones que no estén en la lista sin confirmación explícita.

---

## 6. Captura de leads — `POST /api/contact`

Es el único flujo de conversión de la landing. Cualquier cambio acá es de alto riesgo.

**Contrato del endpoint** (campo `name` del formulario ⇄ clave del JSON):

| Campo | Regla |
|---|---|
| `nombre` | Requerido, 1–100 caracteres |
| `correo` | Requerido, formato email válido, máx. 254 caracteres |
| `mensaje` | Requerido, 1–3000 caracteres |
| `website` | **No es un campo real**: honeypot anti-spam. Si viene con contenido → `400` |

### Los límites viven en un solo lugar

Los máximos por campo (`100` / `254` / `3000`) **no se escriben a mano en ningún
lado**. Están en `lib/contact-limits.ts` como `CONTACT_LIMITS`, y lo importan los
dos lados del contrato:

- `app/api/contact/route.ts` los aplica al validar;
- `components/site/contact-form.tsx` los expone como `maxLength` y como mensajes
  de error de campo.

Si se duplicaran, el cliente terminaría avisando por un envío que el servidor
rechaza, y el único síntoma sería un `400` sin explicación. **Al cambiar un
límite, se cambia en `lib/contact-limits.ts` y en ningún otro lugar.**

El límite de **10 KB del body no va ahí**: es un límite de transporte, no de
campo, y no se puede expresar como `maxLength`. Se queda en el route handler
como `maxRequestBytes`.

**Controles de seguridad ya implementados — mantenelos:**

- Límite de tamaño del body: **10 KB** → `413`.
- **Rate limit en memoria por IP: 5 requests cada 10 minutos** → `429`.
  (Es por instancia; en serverless no es un límite global. No lo desactives sin reemplazarlo.)
- Sanitización de saltos de línea en el nombre antes de construir el subject (`mailer.ts`).
- El `replyTo` es el correo del lead; el remitente es `SMTP_FROM_EMAIL`.

**Variables de entorno** (ver `.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
`SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`, `CONTACT_TO_EMAIL`.

Al tocar este flujo: probá los cuatro caminos — éxito, validación fallida, honeypot, y
rate limit excedido — y verificá que el estado de error siga siendo visible y accesible
(`role="alert"` / `role="status"`) en el formulario.

---

## 7. SEO y performance

Requisitos del Rol 3, y criterio de aceptación del Rol 1. No los trates como opcionales.

- **Metadata** en `app/layout.tsx`: `title`, `description`, `generator` en español y
  orientadas a conversión. Actualizarlas es parte del trabajo, no un afterthought.
- Un solo `<h1>` por página. Jerarquía de headings sin saltos.
- `lang="es"` en `<html>`; `viewport` con `width=device-width` e `initialScale=1`.
- Imágenes con dimensiones explícitas para evitar CLS.
- Objetivo de Core Web Vitals: **LCP < 2.5s, INP < 200ms, CLS < 0.1**.
- Analítica de Vercel montada **solo en producción** — no romper esa condición.
- **Costo de framer-motion, medido por build A/B (no estimado):** se compiló la
  landing dos veces, con y sin la librería, y se comprimió el bundle con gzip.

  | Build | Chunks | Sin comprimir | gzip |
  |---|---|---|---|
  | Sin framer-motion | 9 | 593,2 kB | 182,5 kB |
  | Con framer-motion | 10 | 693,2 kB | 217,0 kB |
  | **Costo** | **+1** | **+100,0 kB** | **+34,5 kB** |

  Son **34,5 kB gzip**, el 15,9% del JS de la landing. Descarga extra: ~177 ms a
  1,6 Mbps, ~31 ms a 9 Mbps. Todos los chunks se sirven con `async`, así que
  **no bloquean el parseo del HTML ni el LCP**.
  - Ya está minimized al máximo: `LazyMotion` + `m` + `domAnimation` estáticos.
    Usar `motion` a secas o `domMax` paga bastante más.
  - Si ese presupuesto no se acepta, la alternativa es el sistema de movimiento
    en CSS que ya está en `globals.css` (`.reveal` / `.is-in`) con un
    `IntersectionObserver` propio: mismo resultado visual, costo cercano a 34,5 kB
    menos. **Es una decisión de producto, no del dev.** No borrar las clases CSS
    por si se toma ese camino.
- **El `h1` del hero no se anima.** Es el elemento LCP: arrancarlo en `opacity: 0`
  retrasa el registro del paint y, además, esconde la propuesta de valor detrás de
  una animación. Los reveals de scroll (`Reveal`) son para contenido bajo el fold.
- **El `alt` de los logos de integración es redundante**: el nombre ya está escrito
  al lado como texto, así que un lector de pantalla lo anuncia dos veces. Pasarlo a
  `alt=""` es una decisión del Rol 2 pendiente de confirmación.

### Deuda técnica conocida (verificar antes de dar por cerrado un despliegue)

- ~~`next.config.mjs` tiene `typescript.ignoreBuildErrors: true`~~ — **resuelto**: la
  válvula se eliminó y el build valida tipos. Si reintroducís el flag, el build vuelve
  a pasar en verde con errores reales.
- `next.config.mjs` tiene **`images.unoptimized: true`**, lo que penaliza el LCP. Es
  aceptable en el diseño actual de imágenes servidas como asset local; evaluá
  reintroducir la optimización si las imágenes crecen.
- `package.json` todavía se llama `my-project`. Renombrar a `fuccina` es un cambio de bajo
  riesgo pendiente de hacer.
- **Falta la imagen de Open Graph.** `metadataBase` ya apunta a
  `https://fuccina.com.ar` y el canonical está declarado, pero no hay un asset
  1200×630 para la previsualización de links. Sin ella, Facebook/LinkedIn/X
  muestran la tarjeta sin imagen. Crear `app/opengraph-image.tsx` (o un asset
  en `public/`) es trabajo del Rol 2: la imagen es diseño.
- **Los enlaces del pie "Privacidad" y "Términos" apuntan a `#top`.** No hay páginas
  legales publicadas; crear `/privacidad` y `/terminos` es decisión de negocio.
- **Los dos iconos de contacto del pie van al mismo `mailto:`.** Uno de los dos
  es redundante: revisar con el Rol 2 cuál corresponde.

---

## 8. Reglas para los agentes

1. **El objetivo del repo es la landing.** Antes de aceptar una tarea, confirmá que cae
   dentro del alcance. Si no, decilo en vez de expandirte en silencio.
2. **Respetá el rol que asumís.** El QA no rediseña, el designer no toca la lógica del
   endpoint, el dev no reescribe la paleta sin aprobación.
3. **No inventes datos de negocio.** Precios, límites de plan, integraciones y claims de
   producto salen del documento o de confirmación humana. Si te falta un dato, pregunta.
4. **Mobile-first, siempre.** El diseño se valida primero en móvil.
5. **Dark mode y tokens, siempre.** Nada de colores hardcodeados ni de un modo claro nuevo.
6. **Accesibilidad no es extra.** Landmarks, foco visible, `alt` en español, contraste
   suficiente sobre fondo oscuro, y estados de formulario anunciables.
7. **TypeScript estricto.** No introduzcas `any` para silenciar un error.
8. **Dejá el árbol limpio.** El bloque `nextjs-agent-rules` de este archivo lo regenera
   `next dev`: nunca lo borres, y commitéalo junto con tu trabajo.
9. **Documentá en español** los comentarios, los textos de UI y los mensajes de error.
   Los identificadores de código, en inglés.

---

## 9. Comandos

```bash
pnpm install
pnpm dev          # servidor de desarrollo
pnpm build        # build de producción
pnpm start        # sirve el build
```

No hay lint ni test configurados todavía. Si los agregás, usá `pnpm` y dejá los scripts
declarados en `package.json`.

---

## 10. Fuente de verdad

- **Contexto de empresa, productos y roles:** `docs/Fuccina - Documento Operativo y Perfiles de Equipo.docx`
- **Implementación real:** el código de este repositorio.

Cuando el documento y el código discrepen, el código describe lo que está publicado — pero
la discrepancia es una señal para **avisar**, no para elegir silenciosamente. Caso conocido:
el documento no menciona **Faro**, que ya está en producción en la landing.
