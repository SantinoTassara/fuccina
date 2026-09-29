<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Fuccina

Instrucciones operativas para los agentes que trabajan en este repo. Todo lo que está
acá es contexto que **no se deduce leyendo el código**: si algo no aparece en este archivo,
es porque se lee directo del código y no hace falta repetirlo.

## 1. Alcance

- El objetivo **exclusivo** del repo es la landing oficial de Fuccina. Un pedido que se salga
  de eso se señala, no se ejecuta en silencio.
- **Los datos de negocio no se inventan.** Precios, límites de plan, integraciones y claims
  salen de `components/site/data.ts` (que es lo publicado) o de confirmación humana. Si
  falta un dato, se pregunta.
- Existen tres subagentes de rol disponibles: `qa-specialist`, `ui-ux-designer` y
  `fullstack-developer`. Se definen en `.opencode/agents/`, que está **gitignored**: son
  configuración local, no forman parte del repo. `AGENTS.md` tiene prioridad sobre ellos.
  Ojo: esos archivos quedaron desactualizados (todavía citan el `ignoreBuildErrors` que ya
  se eliminó); si los invocás, aplicá lo que dice este archivo.
- Idioma: comentarios, copy de UI y mensajes de error en **español rioplatense**; los
  identificadores de código en inglés.

## 2. Comandos

```bash
pnpm install            # `node_modules` está gitignored: en un clone limpio no existe
pnpm dev                # servidor de desarrollo
pnpm build              # build de producción — AHORA también typecheckea
pnpm start              # sirve el build
pnpm exec tsc --noEmit  # typecheck rápido y focalizado: es el chequeo más barato
```

- **No hay lint, ni tests, ni CI.** No existe un comando para correr "un test suelto".
  Para cualquier cambio la verificación es `tsc --noEmit` y, si toca algo visible, `pnpm build`
  más mirar la página.
- `next.config.mjs` ya **no** tiene `typescript.ignoreBuildErrors`: el build falla si hay
  errores de tipos. No reintroducir esa válvula.
- `node_modules/next/dist/docs/` es la guía de la versión instalada de Next. No existe hasta
  correr `pnpm install`.

## 3. Arquitectura

```
app/
  layout.tsx           metadata, fuentes, <noscript> anti-JS, MotionProvider, JSON-LD
  page.tsx             Server Component: solo compone secciones, sin JS propio
  globals.css          tokens OKLCH + utilidades de marca + escala de movimiento
  opengraph-image.tsx  tarjeta 1200x630 generada con next/og (Satori)
  robots.ts  sitemap.ts metadata generadas por Next desde lib/site.ts
  api/contact/         route.ts (validación) + mailer.ts (SMTP)
components/
  site/
    data.ts            contenido: navItems, plans, integrationLogos, pillars
    motion.tsx         MotionProvider (LazyMotion) + la escala de tiempos compartida
    reveal.tsx         entrada al entrar en viewport
    header.tsx  contact-form.tsx  hero-actions.tsx   ← los únicos con 'use client'
    use-body-scroll-lock.ts  structured-data.tsx  logo.tsx
    sections/          hero, product, integrations, pricing, contact, footer (Server)
  ui/button.tsx        primitiva shadcn
lib/
  site.ts              SITE: dominio, nombre, tagline, description, locale
  contact-limits.ts    CONTACT_LIMITS: los máximos por campo
  utils.ts             cn()
assets/Geist-Regular.ttf   solo para opengraph-image
```

Cosas que no se ven leyendo los nombres:

- **No es un monorepo.** `pnpm-workspace.yaml` no tiene `packages:`; solo existe para
  `minimumReleaseAgeExclude` de `next` y `@next/*`. El lockfile tiene un único importer (`.`).
- **No hay `src/`.** El alias `@/*` apunta a la **raíz** del proyecto (`tsconfig.json`).
- **Frontera server/client:** todo el texto se renderiza en el servidor. El JS de cliente
  existe solo donde hay estado real: menú móvil, envío del formulario y animaciones.
- `Reveal` es un Client Component que recibe Server Components por `children`; eso es lo que
  permite animar sin volver cliente la sección entera. Sus props tienen que ser serializables
  (números, strings, `className`) — no se le puede pasar una función ni un componente como
  prop distinta de `children`.
- `app/page.tsx` usa `overflow-x-clip` y no `overflow-hidden` a propósito: `overflow-hidden`
  convierte el `main` en contenedor de scroll y rompe el salto a las anclas.
- **Indentación:** 2 espacios en `app/` y `components/`; **4 espacios en
  `app/api/contact/`**. Seguí el archivo que estás tocando, no lo reformatees.
- `shadcn` y `tw-animate-css` son dependencias de runtime porque `globals.css` los importa
  (`@import 'shadcn/tailwind.css'`). No las muevas a `devDependencies` sin tocar el CSS.

### Fuentes únicas — no dupliques estos valores

Es el patrón más importante del repo. Si un valor aparece en dos archivos a mano, un cambio
deja de propagarse y el síntoma es un `400` silencioso o un sitemap apuntando a otro host.

| Fuente | Lo que gobierna | Quién lo importa |
|---|---|---|
| `lib/site.ts` (`SITE`) | dominio, nombre, tagline, description, locale | `layout.tsx` (metadataBase/canonical/OG), `sitemap.ts`, `robots.ts`, JSON-LD |
| `lib/contact-limits.ts` (`CONTACT_LIMITS`) | máximos por campo: 100 / 254 / 3000 | `api/contact/route.ts` (valida) y `contact-form.tsx` (`maxLength` + mensajes) |
| `components/site/data.ts` | nav, precios, integraciones, pilares | header y todas las secciones |

Excepción declarada: el límite de **10 KB del body** vive en el route handler
(`maxRequestBytes`), no en `CONTACT_LIMITS` — es un límite de transporte y no se puede
expresar como `maxLength`.

## 4. Sistema de diseño

- **Dark only.** No hay tema claro; `color-scheme: dark` es global. Todos los colores son
  variables CSS en **OKLCH** en `app/globals.css`. Nunca hardcodear un hex en un componente:
  usá los tokens semánticos (`bg-background`, `text-primary`, `border-border`…).
- Acento de marca: `--primary: oklch(.76 .16 70)` (naranja). Fondo `--background: oklch(.115 .012 90)`.
  Radio base `--radius: .7rem`.
- Tipografía: `Geist` + `Geist Mono`, vía `next/font/google` en `layout.tsx`. El documento de
  marca menciona Inter y Montserrat: ese cambio es del Rol 2 y tiene que cubrir todo el árbol.
- Voz: español rioplatense, corto, orientado a resultados. *"Recupera lo que ya era tuyo"*,
  no *"módulo de recuperación de carritos v2"*. Sobre Slancio se habla de **tokens de
  recuperación configurados por segmento**, nunca de "cupones de descuento".
- Títulos en `text-balance` + tracking negativo (`tracking-[-.04em]` a `[-.055em]`);
  párrafos en `text-pretty`. El ritmo de sección sale de `.section-h2` / `.section-pad` /
  `.section-index`, no de clases sueltas.

### Utilidades de marca

Definidas en `app/globals.css`: `.eyebrow`, `.title-glow`, `.icon-box`, `.module-number`,
`.bg-stage`, `.grain`, `.rules`, `.panel` / `.panel-hover`, `.bracket` / `.bracket-hover`,
`.card-rule`, `.panel-lift`, `.section-index` / `.section-h2` / `.section-pad`, `.btn-outline`,
`.field` / `.field-invalid` / `.field-msg`, `.form-alert`, `.scroll-target`, `.tap-target` /
`.tap-icon`, `.spinner`, `.success-mark`.

- **`.scroll-target` en toda sección con `id`.** Sin ella, el header fijo tapa el destino del
  ancla. Las anclas actuales son `#producto`, `#como-funciona`, `#integraciones`, `#precios`,
  `#contacto`.
- **`.tap-target` / `.tap-icon` dan los 44px** de área táctil sin tocar la escala tipográfica.
  Los CTA primarios usan `min-h-12` (48px). `.field` usa `text-base` en móvil **a propósito**:
  por debajo de 16px iOS Safari hace zoom al enfocar.
- Estas clases están hoy **sin uso** (restan del sistema anterior, borrado de a poco):
  `.module-card`, `.dashboard-shell`, `.shake`, `.form-out`, `.success-in`. No las borres
  por cleanup no pedido, pero no las cuentes como API viva.

### La regla de capas — `@layer components`, siempre

Tailwind declara `@layer theme, base, components, utilities` y **el orden de las capas gana
sobre el orden del archivo**. Una clase de marca escrita suelta al final de `globals.css`
compite con cualquier utility en igualdad de especificidad y **gana por posición**. Eso ya
pasó: `.tap-icon` declaraba `display: inline-flex` después de `.md:hidden { display: none }` y
el botón de menú móvil aparecía en escritorio.

**Toda utilidad de marca nueva va dentro de `@layer components`.** Efecto secundario a
tener presente: dentro de la capa las utilities **ganan** sobre la clase de marca (lo
correcto — la clase da el default, la utility ajusta el caso). Por eso el `p-4 sm:px-4` del
JSX de las tarjetas de integraciones pisa el `p-6 sm:p-8` de `.panel`; si esas tarjetas se
ven raras, el primer lugar donde mirar es el padding, no `.panel`.

## 5. Movimiento

- **Motor: framer-motion, y solo `m` + `LazyMotion`.** `MotionProvider` registra
  `domAnimation`; usar `motion` a secas o `domMax` infla el bundle. Ese provider
  (`components/site/motion.tsx`) está en el layout, y `MotionConfig reducedMotion="user"`
  respeta `prefers-reduced-motion`.
- **La escala de tiempos está duplicada a propósito y hay que manterla sincronizada:**
  `--motion-ease-out` / `--motion-ease-in` / `--motion-fast` / `--motion-base` /
  `--motion-reveal` en `globals.css`, y `EASE_OUT` / `EASE_IN` / `DURATION_FAST` /
  `DURATION_BASE` / `DURATION_REVEAL` / `STAGGER` en `motion.tsx`. Son los mismos valores en
  dos formatos porque un Client Component no puede leer custom properties. Si el Rol 2 cambia
  una curva, se cambian los dos lados.
- **Se animan solo `opacity` y `transform`.** Nada de `height`, `width`, `top` ni
  `box-shadow` en scroll: matan el hilo principal.
- **Regla anti-JS:** todo elemento animado con estado inicial oculto lleva el atributo
  `data-motion-hidden`, y el `<noscript>` de `layout.tsx` lo fuerza a `opacity: 1`. Si se
  agrega una animación de entrada y se olvida el atributo, el elemento desaparece sin JS.
  **No borrar ese `<noscript>`.**
- El **`h1` del hero no se anima**: es el LCP, arrancarlo en `opacity: 0` retrasa el paint y
  además esconde la propuesta de valor. Los `Reveal` son para contenido bajo el fold.
- **Costo medido de framer-motion** (build A/B con gzip, no estimado): **+34,5 kB gzip**
  (+100 kB sin comprimir, +1 chunk), ~15,9% del JS de la landing. Todos los chunks van con
  `async`, así que no bloquean el HTML ni el LCP. Quitar la librería es una decisión de
  producto, no del dev: no borres las clases de movimiento en CSS (`globals.css` las tiene)
  por si se toma ese camino.
- El motor del scroll-reveal es `Reveal` (`whileInView`, `once: true`). No hay `.reveal` /
  `.is-in` en el CSS: no existían, y si alguna vez se animan desde CSS se usan las variables
  `--motion-*`, no curvas escritas a mano.

## 6. Navegación móvil

Todo el comportamiento vive en `components/site/header.tsx`. Si se lo toca, hay que preservar:

- `aria-expanded` + `aria-controls` en el botón, apuntando al panel; `Escape` cierra y
  **devuelve el foco** al botón.
- Al cruzar a `md` con el panel abierto se cierra solo. Si no, el `body` queda con
  `overflow: hidden` y la página no scrollea en escritorio.
- El scroll se bloquea con `useBodyScrollLock`, que compensa el ancho de la barra. Al
  navegar a un ancla hay que llamar **`release()` antes de cerrar**: con `overflow: hidden`
  puesto, el navegador no puede desplazar la página.

## 7. Captura de leads — `POST /api/contact`

Único flujo de conversión de la landing. Cambiarlo es de alto riesgo.

| Campo (`name` ⇄ JSON) | Regla |
|---|---|
| `nombre` | Requerido, 1–100 |
| `correo` | Requerido, email válido, máx. 254 |
| `mensaje` | Requerido, 1–3000 |
| `website` | **No es un campo real**: honeypot. Con contenido → `400` |

Controles implementados — no eliminar sin reemplazo:

- Body > 10 KB → `413`. Rate limit en memoria por IP: 5 requests / 10 min → `429`.
  Es **por instancia**: en serverless no es un límite global.
- El `replyTo` es el correo del lead; el remitente es `SMTP_FROM_EMAIL`. Se sanitizan los
  saltos de línea del nombre antes de armar el subject (`mailer.ts`).
- Env (ver `.env.example`): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`,
  `SMTP_FROM_EMAIL`, `CONTACT_TO_EMAIL`. Sin eso el endpoint responde `502`.

Al tocar este flujo probá los **cuatro caminos**: éxito, validación fallida, honeypot y rate
limit excedido — y verificá que el estado siga siendo anunciable (`role="status"` en éxito,
`role="alert"` en error de campo y de envío, `aria-invalid` + `aria-describedby` por campo).

Dos límites que ya existen y conviene no pasar por alto al auditar:

- El corte de 10 KB mira el header `content-length`, que es opcional: un body sin ese header
  pasa el corte.
- `requestsByIp` no borra entradas vencidas: el Map crece con cada IP nueva durante la vida
  del proceso. Es un rate limit disuasorio, no un límite de producción.

## 8. SEO

- **Metadata en `layout.tsx`**, y el dominio sale siempre de `SITE.url` (`lib/site.ts`), nunca
  escrito a mano. `sitemap.ts`, `robots.ts`, el canonical y el JSON-LD lo derivan de ahí: si
  el dominio cambia y no cambian todos, el sitemap apunta a otro host y Google lo lee como
  duplicado.
- El sitemap tiene **una sola URL** a propósito: las secciones son anclas y el protocolo de
  sitemaps no transporta fragmentos.
- El JSON-LD declara solo `Organization` con `name`, `url`, `slogan`, `description` y `logo`.
  **No agregar** `address`, `telephone`, `sameAs` ni `offers` sin confirmación humana: son
  datos no publicados, y `offers` duplicaría los precios en un segundo lugar.
- `app/opengraph-image.tsx` genera la tarjeta con `next/og`. Dos trampas:
  - **Satori es un subconjunto de CSS**: todo va con `display: flex` explícito, no existen
    `box-shadow` ni `filter`, el fondo y el `color` van en el div raíz, y revienta si
    encuentra una propiedad con valor `undefined` (por eso `Corner` arma las coordenadas con
    spreads condicionales).
  - **Los hex de `COLOR` son el pastado de los tokens OKLCH** porque Satori no resuelve
    `var()` ni `oklch()`. Hoy coinciden al hex con `--primary` (`#f09c17`) y `--background`
    (`#060502`). Si se toca un token, **re-derivar estos valores**, no estimarlos a ojo.
- Un solo `<h1>` (el del hero), jerarquía de headings sin saltos, `lang="es"`, un `main`,
  un `header` con `nav aria-label` y un `footer`. Imágenes con `width`/`height` explícitos y
  `alt` en español.
- Objetivos: LCP < 2,5 s, INP < 200 ms, CLS < 0,1. La analítica de Vercel se monta **solo en
  producción** — no romper esa condición.

## 9. Pendientes verificados

- **`images.unoptimized: true`** en `next.config.mjs` penaliza el LCP y pesa: los tres logos
  de integraciones suman 67,6 kB de PNG (512×512, 320×320, 640×480) y se muestran a 36×36 px.
  Con `next/image` optimizado caerían a unos pocos kB. Ojo: `sharp` no es dependencia directa
  (entra como opcional transitiva de `next`); en Vercel está, en hosting propio hay que
  agregarlo.
- Los enlaces del pie **"Privacidad" y "Términos" apuntan a `#top`**: no hay páginas legales.
  Crearlas es decisión de negocio.
- Los dos iconos de contacto del pie van al **mismo `mailto:`**; uno es redundante. Definir
  cuál con el Rol 2.
- El `alt` de los logos de integración (`"X logo"`) es **redundante**: el nombre ya está
  como texto al lado, un lector de pantalla lo anuncia dos veces. Pasarlo a `alt=""` es
  decisión del Rol 2.
- En `opengraph-image.tsx` solo se registra la fuente **weight 400** mientras la tarjeta pide
  `fontWeight` 600/700: revisar visualmente si el titular y la marca salen más livianos de lo
  previsto.
- `docs/Fuccina - Documento Operativo y Perfiles de Equipo.docx` es la fuente de contexto de
  empresa, pero es un **binario**: no se puede grepear. Este archivo ya lo destila; si hace
  falta un dato de ahí, extraer el texto primero.
  Discrepancia conocida: el documento es anterior a **Faro**, que ya está publicado en la
  landing. Cuando el documento y el código discrepan, el código describe lo publicado — pero
  la discrepancia se avisa, no se resuelve en silencio.
