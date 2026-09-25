@AGENTS.md

# This is NOT the Next.js you know

This version has breaking changes â€” APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` â€” verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md â€” Fuccina

Instrucciones operativas para los agentes de IA que trabajan en este repositorio.
Antes de escribir o revisar cÃ³digo, lee las secciones **Contexto**, **Sistema de diseÃ±o** y **Reglas**.

---

## 1. Contexto de la empresa

### QuÃ© es Fuccina

Fuccina es una compaÃ±Ã­a de vanguardia que desarrolla soluciones tecnolÃ³gicas de alto impacto
para el **sector e-commerce y el entorno empresarial**. La propuesta no es vender software
suelto: es vender *infraestructura de crecimiento*.

Posicionamiento de marca (el que la landing debe comunicar de forma consistente):

> **"La infraestructura invisible de tu crecimiento."**
> MÃ¡s ventas. Menos fricciÃ³n.

Pilares de la propuesta de valor, en el orden en que aparecen en el sitio:

1. **Genera clientes** â€” adquisiciÃ³n y conversiÃ³n.
2. **Recupera ganancia** â€” venta de carritos que ya se habÃ­an perdido.
3. **Crea reputaciÃ³n** â€” reseÃ±as y tickets gestionados post-compra.

### Producto flagship: Slancio

Slancio ataca uno de los mayores problemas del comercio digital: el **abandono del carrito
de compra**. No es un discount widget genÃ©rico; el diferencial es el **token**.

- **Funcionalidad core:** detecciÃ³n y recuperaciÃ³n de carritos mediante la generaciÃ³n de
  **tokens personalizados**, altamente configurables.
- **Los incentivos se configuran en funciÃ³n de:**
  - **Perfil del comprador** â€” diferenciaciÃ³n entre usuarios nuevos y recurrentes.
  - **Contenido del carrito** â€” reglas basadas en cantidad de productos o categorÃ­as especÃ­ficas.
- **Dashboard interactivo** con mÃ©tricas en tiempo real, estadÃ­sticas de recuperaciÃ³n e
  historial detallado, para optimizar la conversiÃ³n con datos precisos.

> Cuando escribas copy o UI sobre Slancio, habla de **recuperaciÃ³n de ingresos con reglas
> por segmento**, no de "cupones de descuento". Es la diferencia entre un producto y un plugin.

### Producto secundario: Faro (post-compra)

Faro no aparece en el documento operativo (que es anterior a su lanzamiento) pero **ya estÃ¡
publicado en la landing**, asÃ­ que es parte de la oferta vigente:

- Consulta automÃ¡ticamente cÃ³mo fue la experiencia despuÃ©s de cada compra.
- Si la experiencia fue **positiva** â†’ invita al cliente a dejar una **reseÃ±a**.
- Si fue **negativa** â†’ ofrece al cliente abrir un **ticket** directamente con la tienda.

Nomenclatura comercial en uso: **Slancio** (producto 01) y **Faro** (producto 02),
comunicados juntos como *"Dos motores. Un objetivo."*

### Objetivo de este repositorio

El objetivo **primordial y exclusivo** de este equipo de agentes es el **diseÃ±o, desarrollo,
testeo y despliegue integral de la nueva Landing Page oficial de Fuccina**.

Cualquier cambio fuera de ese alcance debe seÃ±alarse explÃ­citamente, no|colarse de forma
silenciosa en un PR de la landing.

---

## 2. Roles de agentes IA

El proyecto se ejecuta bajo tres roles definidos. Cada agente asume uno (o declara
explÃ­citamente cuÃ¡l estÃ¡ cubriendo) y respeta los lÃ­mites de su responsabilidad.

### Rol 1 â€” QA Specialist (Aseguramiento de Calidad)

**Objetivo:** garantizar la calidad tÃ©cnica y funcional de la landing, asegurando una
experiencia de usuario sin errores y un rendimiento Ã³ptimo en todos los entornos.

**Responsabilidades exclusivas:**

- Pruebas de diseÃ±o responsivo en escritorio, tablet y mÃ³vil.
- Compatibilidad entre navegadores y auditorÃ­a de rendimiento (**Core Web Vitals**, velocidad de pÃ¡gina).
- ValidaciÃ³n de **formularios de captura de leads**, botones CTA, enlaces e integraciones de contacto.
- AuditorÃ­as de **accesibilidad web** y cumplimiento de estÃ¡ndares de navegaciÃ³n.

**Entregables:** informes de bugs detallados, scripts de automatizaciÃ³n de pruebas,
matriz de cumplimiento de reglas de negocio de Slancio.

### Rol 2 â€” UI/UX Designer (DiseÃ±ador de Experiencia e Interfaz)

**Objetivo:** definir la identidad visual y la arquitectura de informaciÃ³n de la landing
para maximizar la conversiÃ³n y comunicar eficazmente la propuesta de valor de Fuccina.

**Responsabilidades exclusivas:**

- DiseÃ±o visual de alta fidelidad y wireframing: hero, propuesta de valor, exhibiciÃ³n de
  Slancio, maqueta de demo interactiva, testimonios, planes de precios y llamada a la acciÃ³n.
- DiseÃ±os responsivos **mobile-first** y generaciÃ³n de activos visuales (iconos, elementos de marca).
- **UX copywriting** enfocado en los servicios de Fuccina y el showcase estratÃ©gico de Slancio.
- OptimizaciÃ³n de la tasa de conversiÃ³n (**CRO**) mediante diseÃ±o persuasivo de elementos de captaciÃ³n.

**Entregables:** wireframes y prototipos de alta fidelidad, guÃ­a de estilo y librerÃ­a de
componentes UI, mapas de calor y flujos de usuario validados.

### Rol 3 â€” Full Stack Developer

**Objetivo:** desarrollar la arquitectura tÃ©cnica de la landing, priorizando velocidad de
carga, SEO y robustez de las integraciones de backend.

**Responsabilidades exclusivas:**

- Desarrollar y optimizar la landing en **Next.js + Tailwind**, respetando las directivas de diseÃ±o.
- OptimizaciÃ³n **SEO**, tiempos de carga rÃ¡pidos, despliegue y configuraciÃ³n de dominio.

**Entregables:** repositorios documentados y limpios, documentaciÃ³n de API interna y externa,
arquitectura de base de datos optimizada.

### GuÃ­a de interacciÃ³n (system prompts de referencia)

| Rol | Prompt de referencia |
|---|---|
| QA Specialist | ActÃºa como un Senior QA Engineer especializado en optimizaciÃ³n web. Tu enfoque es el rendimiento (Core Web Vitals), la compatibilidad multi-dispositivo y la integridad de los flujos de conversiÃ³n de la Landing Page de Fuccina. |
| UI/UX Designer | ActÃºa como un DiseÃ±ador de Producto con enfoque en Marketing de ConversiÃ³n para SaaS. Tu objetivo es crear una Landing Page visualmente impactante que convierta visitantes en leads, utilizando los estÃ¡ndares de marca de Fuccina. |
| Full Stack Developer | ActÃºa como un Desarrollador Full Stack experto en performance web. Prioriza la implementaciÃ³n tÃ©cnica de la Landing Page con Next.js, asegurando una puntuaciÃ³n SEO perfecta, carga instantÃ¡nea y seguridad en la gestiÃ³n de leads. |

---

## 3. Stack tÃ©cnico

| Capa | TecnologÃ­a |
|---|---|
| Framework | **Next.js 16** (App Router) |
| UI runtime | **React 19** |
| Estilos | **Tailwind CSS v4** ( `@tailwindcss/postcss`, configuraciÃ³n en CSS, sin `tailwind.config.js`) |
| Componentes | **shadcn/ui** â€” estilo `base-nova` sobre `@base-ui/react`, iconos `lucide-react` |
| Lenguaje | **TypeScript** estricto (`strict: true`) |
| Paquetes | **pnpm** |
| Email | **nodemailer** (SMTP) |
| AnimaciÃ³n | **framer-motion** â€” sÃ³lo en Client Components; la escala sale de `globals.css` |
| AnalÃ­tica | `@vercel/analytics` (solo en producciÃ³n) |

Alias de import: `@/*` â†’ raÃ­z del proyecto. Ejemplos: `@/components/ui/button`, `@/lib/utils`.

> **Ojo con la versiÃ³n de Next.js.** Este proyecto corre una versiÃ³n reciente cuyas APIs y
> convenciones pueden diferir de tu conocimiento previo. Antes de escribir cÃ³digo, lee la guÃ­a
> correspondiente en `node_modules/next/dist/docs/`. No asumas la API de versiones anteriores.

---

## 4. Sistema de diseÃ±o

### Tema

- **Modo oscuro Ãºnicamente.** No hay tema claro; `color-scheme: dark` es global.
- Todos los colores se definen como **variables CSS en OKLCH** dentro de `app/globals.css`.
  **Nunca hardcodees un hex en un componente** â€” usÃ¡ los tokens semÃ¡nticos de Tailwind
  (`bg-background`, `text-muted-foreground`, `text-primary`, `border-border`...).

### Tokens clave

| Token | Valor | Uso |
|---|---|---|
| `--background` | `oklch(.115 .012 90)` | Fondo casi negro cÃ¡lido |
| `--foreground` | `oklch(.96 .012 90)` | Texto principal |
| `--primary` | `oklch(.76 .16 70)` | **Naranja de marca** â€” CTAs, acentos, glows |
| `--muted-foreground` | `oklch(.62 .015 90)` | Texto secundario |
| `--border` | `oklch(1 0 0 / 10%)` | Bordes sutiles |
| `--radius` | `.7rem` | Radio base; variantes derivadas (`sm`/`md`/`lg`/`xl`/`2xl`) |

### Clases utilitarias propias (definidas en `globals.css`)

Usarlas en lugar de reescribir el CSS a mano:

- `.eyebrow` â€” micro-label monoespaciado uppercase con punto de estado en `primary`.
- `.title-glow` â€” halo radial naranja difuminado detrÃ¡s de titulares.
- `.module-card` â€” tarjeta de producto con borde y hover sutil.
- `.icon-box` â€” contenedor cuadrado para iconos de producto.
- `.module-number` â€” numeraciÃ³n monoespaciada (`01 / SLANCIO`).
- `.dashboard-shell` â€” fondo con grilla, usado para la maqueta del dashboard de Slancio.
- `.panel` / `.panel-hover` â€” tarjeta con gradiente interno y borde que se marca al hover.
- `.bracket` / `.bracket-hover` â€” corchetes de encuadre de marca.
- `.section-index` / `.section-h2` / `.section-pad` â€” ritmo de secciÃ³n.
- `.btn-outline` / `.field` â€” botÃ³n y campo de formulario.
- `.tap-target` (44px) / `.tap-icon` (44Ã—44px) â€” **Ã¡rea tÃ¡ctil mÃ­nima**. Usarlas en
  todo control que se pulse con el dedo; los CTA primarios usan `min-h-12` (48px).
- `.scroll-target` â€” `scroll-margin` para que el header fijo no tape el destino de un ancla.

> **Regla de cascada â€” las utilidades de marca van en `@layer components`.**
> Tailwind declara `@layer theme, base, components, utilities`, y el orden de las
> capas gana sobre el orden del archivo. Una clase escrita suelta al final de
> `globals.css` compite con cualquier utility en igualdad de especificidad y
> **gana por posiciÃ³n**: eso hizo que `.tap-icon` (`display: inline-flex`)
> pisara al `md:hidden` del botÃ³n de menÃº y el menÃº de mÃ³vil apareciera en
> escritorio. Dentro de `@layer components`, cualquier utility pisa a la clase
> de marca, que es lo correcto: la clase da el valor por defecto y la utility
> ajusta el caso puntual.
>
> Efecto secundario que hay que tener presente: dentro de la capa, las utilities
> **ganan** sobre la clase de marca. Por eso en las tarjetas de integraciones
> el `p-4 sm:px-4` del JSX ahora manda sobre el `p-6 sm:p-8` de `.panel`. Es lo
> que se pidiÃ³, pero si esas tarjetas se ven raras, el primer lugar donde mirar
> es el padding, no `.panel`.
>
> **Al agregar una utilidad de marca nueva, va dentro de `@layer components`.**
> Si queda suelta, el bug del botÃ³n reaparece.

### Movimiento

- **El motor es framer-motion.** `MotionConfig reducedMotion="user"` respeta
  `prefers-reduced-motion`; los `@media (prefers-reduced-motion: reduce)` de
  `globals.css` hacen lo propio para las transiciones CSS.
- La **escala de tiempos y curvas no se inventa**: `components/site/motion.tsx`
  replica las custom properties `--motion-ease-out`, `--motion-ease-in`,
  `--motion-fast`, `--motion-base` y `--motion-reveal`. Si el Rol 2 cambia esos
  tokens, hay que cambiarlos en los dos lugares.
- SÃ³lo se animan `opacity` y `transform` (capas de compositor). Nada de animar
  `height`, `width`, `top` ni `box-shadow` en scroll: matan el hilo principal.
- `globals.css` conserva un sistema de movimiento en CSS (`.reveal`, `.is-in`,
  `.panel-lift`, `.card-rule`, `.shake`, â€¦). Las clases de scroll-reveal
  (`.reveal` / `.is-in`) quedaron **sin uso**: ese rol lo cumple hoy
  `components/site/reveal.tsx` con `whileInView`. Las demÃ¡s siguen en pie y las
  puede adoptar el Rol 2 para estados de formulario.
- Sin JavaScript, framer-motion no corre y todo lo que arranca en `opacity: 0`
  quedarÃ­a invisible. Por eso **todo elemento animado con estado inicial oculto
  lleva el atributo `data-motion-hidden`**, y el `<noscript>` de `app/layout.tsx`
  lo fuerza a `opacity: 1`. Si se agrega una animaciÃ³n de entrada y se olvida
  marcar el elemento, desaparece sin JS. **No borrar ese `<noscript>`.**

### TipografÃ­a

- **ProducciÃ³n:** `Geist` (texto) + `Geist Mono` (labels, datos, micro-copy), cargadas
  vÃ­a `next/font/google` en `app/layout.tsx`.
- **Pendiente de decisiÃ³n:** el documento operativo de marca especifica **Inter** y
  **Montserrat**. Si el cambio de tipografÃ­a es parte del scope, es una tarea del
  Rol 2 (UI/UX) y debe cubrir todo el Ã¡rbol tipogrÃ¡fico, no solo el hero.

### Voz y tono

- EspaÃ±ol rioplatense, directo y sin relleno. Frases cortas.
- Orientado a resultados, no a features: *"Recupera lo que ya era tuyo"*, no *"MÃ³dulo de
  recuperaciÃ³n de carritos v2"*.
- Titles en `text-balance`, pÃ¡rrafos en `text-pretty`, tracking negativo en titulares
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
    mailer.ts           # envÃ­o SMTP (aviso al negocio + auto-respuesta al lead)
components/
  ui/                   # primitivas shadcn
  site/
    data.ts             # contenido: navItems, plans, integraciones, pilares
    motion.tsx          # MotionProvider (LazyMotion) + escala de tiempos compartida
    reveal.tsx          # entrada al entrar en viewport (envuelve Server Components)
    header.tsx          # Client Component: navegaciÃ³n y menÃº mÃ³vil
    hero-actions.tsx    # Client Component: CTAs del hero + fila de pilares
    contact-form.tsx    # Client Component: formulario de leads
    logo.tsx            # compartido server/client
    use-body-scroll-lock.ts
    sections/           # Server Components: hero, product, integrations,
                        # pricing, contact, footer
lib/
  utils.ts              # helper `cn()`
  contact-limits.ts      # CONTACT_LIMITS: fuente Ãºnica de los lÃ­mites por campo
public/                 # logos de integraciones
docs/                   # documentaciÃ³n operativa de la empresa
```

- **Frontera server/client.** `app/page.tsx` es un Server Component que compone
  todo. SÃ³lo hay JavaScript de cliente donde hay estado real: `header.tsx`
  (menÃº mÃ³vil), `contact-form.tsx` (envÃ­o) y los componentes de animaciÃ³n
  (`motion.tsx`, `reveal.tsx`, `hero-actions.tsx`). Las secciones y sus
  textos se renderizan en el servidor y llegan al HTML.
- `Reveal` es un Client Component que recibe Server Components como `children`:
  eso es lo que permite animar sin volver cliente la secciÃ³n entera. Sus props
  tienen que ser serializables (nÃºmeros, strings, `className`).
- **Secciones actuales** de la landing, con sus IDs (usados por el nav y por
  enlaces ancla): `#producto` (Slancio + Faro), `#como-funciona`,
  `#integraciones`, `#precios`, `#contacto`. Todas con `.scroll-target` para
  compensar el header fijo.
- Estilos con **Tailwind utilities en lÃ­nea**; no agregar CSS nuevo salvo que sea
  una utilidad de marca reutilizable, y en ese caso va en `globals.css`.
- ImÃ¡genes: `next/image` con `width`/`height` explÃ­citos y `alt` descriptivo en espaÃ±ol.

### NavegaciÃ³n mÃ³vil

`components/site/header.tsx` concentra el comportamiento. Si se lo toca, mantener:

- `aria-expanded` + `aria-controls` en el botÃ³n, apuntando al panel.
- `Escape` cierra el panel y **devuelve el foco** al botÃ³n.
- Al pasar a `md` con el panel abierto, se cierra solo (si no, el `body` queda
  con `overflow: hidden` y la pÃ¡gina no scrollea en escritorio).
- El scroll se bloquea con `use-body-scroll-lock`, que compensa el ancho de la
  barra. Al navegar a un ancla hay que llamar **`release()` antes** de cerrar:
  con `overflow: hidden` puesto, el navegador no puede desplazar la pÃ¡gina.
- Ãrea tÃ¡ctil: 44px mÃ­nimo (`.tap-target` / `.tap-icon`), 56px en los Ã­tems de
  la lista del menÃº.

### Datos de negocio â€” no inventar

Planes publicados actualmente. Son **datos reales**: si cambian, los cambia quien lo decida,
nunca el agente por su cuenta.

| Plan | Precio | Volumen / alcance |
|---|---|---|
| Slancio Â· Inicio | $30/mes | Hasta 500 carritos recuperados por mes |
| Slancio Â· Escala | $50/mes | Hasta 1.000 carritos recuperados por mes â€” *MÃ¡s elegido* |
| Faro | $30/mes | GestiÃ³n de reseÃ±as y ruteo inteligente de opiniones |

Integraciones publicadas: **Shopify**, **TiendaNube**, **Google Analytics**. No prometas
integraciones que no estÃ©n en la lista sin confirmaciÃ³n explÃ­cita.

---

## 6. Captura de leads â€” `POST /api/contact`

Es el Ãºnico flujo de conversiÃ³n de la landing. Cualquier cambio acÃ¡ es de alto riesgo.

**Contrato del endpoint** (campo `name` del formulario â‡„ clave del JSON):

| Campo | Regla |
|---|---|
| `nombre` | Requerido, 1â€“100 caracteres |
| `correo` | Requerido, formato email vÃ¡lido, mÃ¡x. 254 caracteres |
| `mensaje` | Requerido, 1â€“3000 caracteres |
| `website` | **No es un campo real**: honeypot anti-spam. Si viene con contenido â†’ `400` |

### Los lÃ­mites viven en un solo lugar

Los mÃ¡ximos por campo (`100` / `254` / `3000`) **no se escriben a mano en ningÃºn
lado**. EstÃ¡n en `lib/contact-limits.ts` como `CONTACT_LIMITS`, y lo importan los
dos lados del contrato:

- `app/api/contact/route.ts` los aplica al validar;
- `components/site/contact-form.tsx` los expone como `maxLength` y como mensajes
  de error de campo.

Si se duplicaran, el cliente terminarÃ­a avisando por un envÃ­o que el servidor
rechaza, y el Ãºnico sÃ­ntoma serÃ­a un `400` sin explicaciÃ³n. **Al cambiar un
lÃ­mite, se cambia en `lib/contact-limits.ts` y en ningÃºn otro lugar.**

El lÃ­mite de **10 KB del body no va ahÃ­**: es un lÃ­mite de transporte, no de
campo, y no se puede expresar como `maxLength`. Se queda en el route handler
como `maxRequestBytes`.

**Controles de seguridad ya implementados â€” mantenelos:**

- LÃ­mite de tamaÃ±o del body: **10 KB** â†’ `413`.
- **Rate limit en memoria por IP: 5 requests cada 10 minutos** â†’ `429`.
  (Es por instancia; en serverless no es un lÃ­mite global. No lo desactives sin reemplazarlo.)
- SanitizaciÃ³n de saltos de lÃ­nea en el nombre antes de construir el subject (`mailer.ts`).
- El `replyTo` es el correo del lead; el remitente es `SMTP_FROM_EMAIL`.

**Variables de entorno** (ver `.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
`SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`, `CONTACT_TO_EMAIL`.

Al tocar este flujo: probÃ¡ los cuatro caminos â€” Ã©xito, validaciÃ³n fallida, honeypot, y
rate limit excedido â€” y verificÃ¡ que el estado de error siga siendo visible y accesible
(`role="alert"` / `role="status"`) en el formulario.

---

## 7. SEO y performance

Requisitos del Rol 3, y criterio de aceptaciÃ³n del Rol 1. No los trates como opcionales.

- **Metadata** en `app/layout.tsx`: `title`, `description`, `generator` en espaÃ±ol y
  orientadas a conversiÃ³n. Actualizarlas es parte del trabajo, no un afterthought.
- Un solo `<h1>` por pÃ¡gina. JerarquÃ­a de headings sin saltos.
- `lang="es"` en `<html>`; `viewport` con `width=device-width` e `initialScale=1`.
- ImÃ¡genes con dimensiones explÃ­citas para evitar CLS.
- Objetivo de Core Web Vitals: **LCP < 2.5s, INP < 200ms, CLS < 0.1**.
- AnalÃ­tica de Vercel montada **solo en producciÃ³n** â€” no romper esa condiciÃ³n.
- **Costo de framer-motion, medido por build A/B (no estimado):** se compilÃ³ la
  landing dos veces, con y sin la librerÃ­a, y se comprimiÃ³ el bundle con gzip.

  | Build | Chunks | Sin comprimir | gzip |
  |---|---|---|---|
  | Sin framer-motion | 9 | 593,2 kB | 182,5 kB |
  | Con framer-motion | 10 | 693,2 kB | 217,0 kB |
  | **Costo** | **+1** | **+100,0 kB** | **+34,5 kB** |

  Son **34,5 kB gzip**, el 15,9% del JS de la landing. Descarga extra: ~177 ms a
  1,6 Mbps, ~31 ms a 9 Mbps. Todos los chunks se sirven con `async`, asÃ­ que
  **no bloquean el parseo del HTML ni el LCP**.
  - Ya estÃ¡ minimized al mÃ¡ximo: `LazyMotion` + `m` + `domAnimation` estÃ¡ticos.
    Usar `motion` a secas o `domMax` paga bastante mÃ¡s.
  - Si ese presupuesto no se acepta, la alternativa es el sistema de movimiento
    en CSS que ya estÃ¡ en `globals.css` (`.reveal` / `.is-in`) con un
    `IntersectionObserver` propio: mismo resultado visual, costo cercano a 34,5 kB
    menos. **Es una decisiÃ³n de producto, no del dev.** No borrar las clases CSS
    por si se toma ese camino.
- **El `h1` del hero no se anima.** Es el elemento LCP: arrancarlo en `opacity: 0`
  retrasa el registro del paint y, ademÃ¡s, esconde la propuesta de valor detrÃ¡s de
  una animaciÃ³n. Los reveals de scroll (`Reveal`) son para contenido bajo el fold.
- **El `alt` de los logos de integraciÃ³n es redundante**: el nombre ya estÃ¡ escrito
  al lado como texto, asÃ­ que un lector de pantalla lo anuncia dos veces. Pasarlo a
  `alt=""` es una decisiÃ³n del Rol 2 pendiente de confirmaciÃ³n.

### Deuda tÃ©cnica conocida (verificar antes de dar por cerrado un despliegue)

- ~~`next.config.mjs` tiene `typescript.ignoreBuildErrors: true`~~ â€” **resuelto**: la
  vÃ¡lvula se eliminÃ³ y el build valida tipos. Si reintroducÃ­s el flag, el build vuelve
  a pasar en verde con errores reales.
- `next.config.mjs` tiene **`images.unoptimized: true`**, lo que penaliza el LCP. Es
  aceptable en el diseÃ±o actual de imÃ¡genes servidas como asset local; evaluÃ¡
  reintroducir la optimizaciÃ³n si las imÃ¡genes crecen.
- `package.json` todavÃ­a se llama `my-project`. Renombrar a `fuccina` es un cambio de bajo
  riesgo pendiente de hacer.
- **Falta la imagen de Open Graph.** `metadataBase` ya apunta a
  `https://fuccina.com.ar` y el canonical estÃ¡ declarado, pero no hay un asset
  1200Ã—630 para la previsualizaciÃ³n de links. Sin ella, Facebook/LinkedIn/X
  muestran la tarjeta sin imagen. Crear `app/opengraph-image.tsx` (o un asset
  en `public/`) es trabajo del Rol 2: la imagen es diseÃ±o.
- **Los enlaces del pie "Privacidad" y "TÃ©rminos" apuntan a `#top`.** No hay pÃ¡ginas
  legales publicadas; crear `/privacidad` y `/terminos` es decisiÃ³n de negocio.
- **Los dos iconos de contacto del pie van al mismo `mailto:`.** Uno de los dos
  es redundante: revisar con el Rol 2 cuÃ¡l corresponde.

---

## 8. Reglas para los agentes

1. **El objetivo del repo es la landing.** Antes de aceptar una tarea, confirmÃ¡ que cae
   dentro del alcance. Si no, decilo en vez de expandirte en silencio.
2. **RespetÃ¡ el rol que asumÃ­s.** El QA no rediseÃ±a, el designer no toca la lÃ³gica del
   endpoint, el dev no reescribe la paleta sin aprobaciÃ³n.
3. **No inventes datos de negocio.** Precios, lÃ­mites de plan, integraciones y claims de
   producto salen del documento o de confirmaciÃ³n humana. Si te falta un dato, pregunta.
4. **Mobile-first, siempre.** El diseÃ±o se valida primero en mÃ³vil.
5. **Dark mode y tokens, siempre.** Nada de colores hardcodeados ni de un modo claro nuevo.
6. **Accesibilidad no es extra.** Landmarks, foco visible, `alt` en espaÃ±ol, contraste
   suficiente sobre fondo oscuro, y estados de formulario anunciables.
7. **TypeScript estricto.** No introduzcas `any` para silenciar un error.
8. **DejÃ¡ el Ã¡rbol limpio.** El bloque `nextjs-agent-rules` de este archivo lo regenera
   `next dev`: nunca lo borres, y commitÃ©alo junto con tu trabajo.
9. **DocumentÃ¡ en espaÃ±ol** los comentarios, los textos de UI y los mensajes de error.
   Los identificadores de cÃ³digo, en inglÃ©s.

---

## 9. Comandos

```bash
pnpm install
pnpm dev          # servidor de desarrollo
pnpm build        # build de producciÃ³n
pnpm start        # sirve el build
```

No hay lint ni test configurados todavÃ­a. Si los agregÃ¡s, usÃ¡ `pnpm` y dejÃ¡ los scripts
declarados en `package.json`.

---

## 10. Fuente de verdad

- **Contexto de empresa, productos y roles:** `docs/Fuccina - Documento Operativo y Perfiles de Equipo.docx`
- **ImplementaciÃ³n real:** el cÃ³digo de este repositorio.

Cuando el documento y el cÃ³digo discrepen, el cÃ³digo describe lo que estÃ¡ publicado â€” pero
la discrepancia es una seÃ±al para **avisar**, no para elegir silenciosamente. Caso conocido:
el documento no menciona **Faro**, que ya estÃ¡ en producciÃ³n en la landing.
