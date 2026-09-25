import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Imagen de Open Graph de Fuccina (1200 × 630).
 *
 * Es la tarjeta que se ve al pegar el link en WhatsApp, Slack, LinkedIn o X.
 * Se genera en el servidor con `next/og`, así que no hay un PNG de 120 KB que
 * mantener ni que se desactualice cuando cambia el copy.
 *
 * Por qué está generada y no subida como asset: el texto de la tarjeta sale de
 * la propuesta de valor. Si mañana cambia el claim, el PNG guardado seguiría
 * diciendo la versión vieja. Generada, no hay forma de que se desincronice.
 *
 * REGLAS DE SATORI (el motor de `next/og`): es un subconjunto de CSS.
 *  - Todo va con `display: flex` explícito; Satori no hace block por defecto.
 *  - `gap` funciona, pero anidar flex anidados es frágil: se prefieren
 *    `position: absolute` para capas decorativas.
 *  - No existen `box-shadow` ni `filter`: por eso el halo del fondo se resuelve
 *    con gradientes radiales, no con desenfoque.
 *  - El color de fondo debe ir en el div raíz, no en `body`.
 *  - También el `color` de texto: Satori no hereda valores por defecto, así que
 *    sin `color` en la raíz cualquier div que no lo fije sale en negro sobre
 *    fondo negro.
 *
 * Los colores son los mismos tokens de `app/globals.css`, pastados a hex porque
 * Satori no resuelve `var(--primary)` ni `oklch()`.
 */

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Fuccina — Más ventas. Menos fricción. La infraestructura invisible de tu crecimiento.'

/** Tokens de marca pastados a hex (ver `app/globals.css`). */
const COLOR = {
  background: '#060502',
  foreground: '#f5f2e9',
  muted: '#8a867c',
  primary: '#f09c17',
} as const

export default async function OpengraphImage() {
  // La fuente se lee del disco y se cachea en memoria entre invocaciones.
  const geist = await readFile(join(process.cwd(), 'assets', 'Geist-Regular.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: COLOR.background,
          color: COLOR.foreground,
          padding: '72px 80px',
          position: 'relative',
          // Dos washes: naranja arriba a la izquierda y un halo inferior.
          // Reemplazan al `blur()` del sitio, que Satori no puede hacer.
          backgroundImage: `radial-gradient(ellipse 60% 70% at 6% -10%, ${COLOR.primary}33 0%, transparent 60%),
                            radial-gradient(ellipse 50% 45% at 100% 100%, ${COLOR.primary}1f 0%, transparent 65%),
                            linear-gradient(${COLOR.foreground}05 1px, transparent 1px),
                            linear-gradient(90deg, ${COLOR.foreground}05 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      >
        {/* --- Marca: yunque + nombre, igual que el header del sitio --- */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLOR.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
            <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
            <path d="M9 12v5" />
            <path d="M15 12v5" />
            <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
          </svg>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>
            <span>fuccina</span>
            <span style={{ color: COLOR.primary }}>.</span>
          </div>
        </div>

        {/* --- Propuesta de valor --- */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 19,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: COLOR.primary,
              marginBottom: 28,
            }}
          >
            [ La infraestructura invisible de tu crecimiento ]
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.045em' }}>
            <div>Más ventas.</div>
            <div style={{ color: COLOR.primary }}>Menos fricción.</div>
          </div>

          <div style={{ display: 'flex', marginTop: 26, fontSize: 25, color: COLOR.muted, lineHeight: 1.5 }}>
            Recuperá los carritos que ya se habían perdido y construí reputación.
          </div>
        </div>

        {/* --- Pilares + corchetes de encuadre, la firma de la marca --- */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 28, fontSize: 18, letterSpacing: '0.14em', textTransform: 'uppercase', color: COLOR.muted }}>
            <span>Genera clientes</span>
            <span style={{ color: COLOR.primary }}>·</span>
            <span>Recupera ganancia</span>
            <span style={{ color: COLOR.primary }}>·</span>
            <span>Crea reputación</span>
          </div>

          <div style={{ display: 'flex', gap: 14, fontSize: 20, letterSpacing: '0.1em', color: COLOR.muted }}>
            <span>Slancio</span>
            <span style={{ color: COLOR.primary }}>+</span>
            <span>Faro</span>
          </div>
        </div>

        {/* Corchetes: la misma firma que en las tarjetas del sitio. */}
        <Corner x={0} y={0} borderTop borderLeft />
        <Corner x={1} y={0} borderTop borderRight />
        <Corner x={0} y={1} borderBottom borderLeft />
        <Corner x={1} y={1} borderBottom borderRight />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Geist', data: geist, weight: 400, style: 'normal' }],
    },
  )
}

/**
 * Un angulo del encuadre, posicionado en una esquina de la tarjeta.
 *
 * Ojo con el estilo: Satori revienta con `Cannot read properties of undefined
 * (reading 'trim')` si encuentra una propiedad con valor `undefined`. Por eso
 * acá se arman las coordenadas con `...(cond ? { left: 28 } : {})` en vez de
 * `left: cond ? 28 : undefined`. Mismo resultado, ninguna propiedad vacía.
 */
function Corner({
  x,
  y,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
}: {
  x: 0 | 1
  y: 0 | 1
  borderTop?: boolean
  borderBottom?: boolean
  borderLeft?: boolean
  borderRight?: boolean
}) {
  const size = 44

  const style: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderColor: COLOR.primary,
    opacity: 0.55,
    ...(x === 0 ? { left: 28 } : { right: 28 }),
    ...(y === 0 ? { top: 28 } : { bottom: 28 }),
    ...(borderTop ? { borderTopWidth: 2 } : {}),
    ...(borderBottom ? { borderBottomWidth: 2 } : {}),
    ...(borderLeft ? { borderLeftWidth: 2 } : {}),
    ...(borderRight ? { borderRightWidth: 2 } : {}),
  }

  return <div style={style} />
}
