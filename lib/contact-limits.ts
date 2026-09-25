/**
 * Límites del payload de `POST /api/contact`.
 *
 * **Fuente única de verdad.** Lo importan los dos lados del contrato:
 *
 * - `app/api/contact/route.ts` los aplica al validar y devolver `400`;
 * - `components/site/contact-form.tsx` los expone como `maxLength`, para que el
 *   navegador frene la escritura y el error se vea antes de gastar un request.
 *
 * Si estos valores vivieran duplicados, el cliente podría terminar validando
 * algo que el servidor rechaza: el formulario se cerraría sin explicar por
 * qué y el único síntoma sería un `400` silencioso. Al compartir el objeto, los
 * dos lados no pueden divergir.
 *
 * Ojo: el límite de 10 KB del body (`maxRequestBytes`) NO vive acá a propósito.
 * Es un límite de transporte, no de campo, y no se puede expresar como
 * `maxLength`. Se queda en el route handler.
 */
export const CONTACT_LIMITS = {
  nombre: 100,
  correo: 254,
  mensaje: 3000,
} as const
