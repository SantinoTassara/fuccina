'use client'

import { AnimatePresence, m } from 'framer-motion'
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'

import { EASE_OUT } from '@/components/site/motion'
import { CONTACT_LIMITS } from '@/lib/contact-limits'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'
type FieldName = 'nombre' | 'correo' | 'mensaje'
type FieldErrors = Partial<Record<FieldName, string>>


const LIMITS = {
  nombre: { min: 1, max: CONTACT_LIMITS.nombre },
  correo: { min: 1, max: CONTACT_LIMITS.correo },
  mensaje: { min: 1, max: CONTACT_LIMITS.mensaje },
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


function validate(values: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {}

  const nombre = values.nombre?.trim() ?? ''
  if (nombre.length < LIMITS.nombre.min) {
    errors.nombre = 'Escribí tu nombre para que podamos dirigirnos a vos.'
  } else if (nombre.length > LIMITS.nombre.max) {
    errors.nombre = `Tu nombre no puede superar los ${LIMITS.nombre.max} caracteres.`
  }

  const correo = values.correo?.trim() ?? ''
  if (correo.length < LIMITS.correo.min) {
    errors.correo = 'Necesitamos un correo para responderte.'
  } else if (correo.length > LIMITS.correo.max) {
    errors.correo = `Ese correo es demasiado largo.`
  } else if (!EMAIL_RE.test(correo)) {
    errors.correo = 'Correo invalido.'
  }

  const mensaje = values.mensaje?.trim() ?? ''
  if (mensaje.length < LIMITS.mensaje.min) {
    errors.mensaje = 'Contanos brevemente qué necesitás.'
  } else if (mensaje.length > LIMITS.mensaje.max) {
    errors.mensaje = `Tu mensaje supera el máximo de ${LIMITS.mensaje.max} caracteres.`
  }

  return errors
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const sending = status === 'sending'

  function moveFocusTo(target?: string | null) {
    if (target === 'success') {
      successRef.current?.focus()
      return
    }
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    first?.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const errors = validate(values)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setStatus('idle')
      setFormError('Revisá los campos marcados antes de enviar.')
      moveFocusTo()
      return
    }

    setFormError(null)
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      })

      if (!response.ok) {

        if (response.status === 429) {
          setFormError('Demasiados envíos desde esta conexión. Probá de nuevo en unos minutos.')
        } else if (response.status === 413) {
          setFormError('El mensaje es demasiado largo para enviarlo. Reducilo e intentá otra vez.')
        } else {
          setFormError('No pudimos enviar el mensaje. Revisá tu conexión o escribinos directo por email.')
        }
        setStatus('error')
        return
      }

      form.reset()
      setFieldErrors({})
      setStatus('success')
      moveFocusTo('success')
    } catch {
      setFormError('No pudimos enviar el mensaje. Revisá tu conexión o escribinos directo por email.')
      setStatus('error')
    }
  }

  function fieldProps(name: FieldName) {
    const hasError = Boolean(fieldErrors[name])
    return {
      name,
      'aria-invalid': hasError || undefined,
      'aria-describedby': hasError ? `${name}-error` : undefined,
      className: `field ${hasError ? 'field-invalid' : ''}`,
    }
  }

  return (
    <div className="relative mx-auto mt-8 max-w-xl">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <m.div
            key="success"
            ref={successRef}
            role="status"
            tabIndex={-1}
            className="flex flex-col items-center rounded-xl border border-primary/60 bg-primary/10 p-8 text-center outline-none"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/55 bg-primary/15 text-primary">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path
                  d="M4 12.5 9.5 18 20 6.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="success-mark"
                />
              </svg>
            </span>
            <p className="mt-5 text-base font-semibold text-foreground">Mensaje enviado</p>
            <p className="mt-2 max-w-sm text-pretty text-sm leading-6 text-muted-foreground">
              Recibimos tu mensaje y te contactamos a la brevedad.
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            aria-busy={sending}
            noValidate
            className="grid gap-3 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_OUT } }}
          >
            <div className="grid gap-1.5">
              <label className="sr-only" htmlFor="contact-name">
                Nombre
              </label>
              <input
                id="contact-name"
                autoComplete="name"
                maxLength={LIMITS.nombre.max}
                placeholder="Tu nombre"
                {...fieldProps('nombre')}
              />
              {fieldErrors.nombre && (
                <p id="nombre-error" className="field-msg">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {fieldErrors.nombre}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <label className="sr-only" htmlFor="contact-email">
                Correo electrónico
              </label>
              <input
                id="contact-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.correo.max}
                placeholder="Tu correo electrónico"
                {...fieldProps('correo')}
              />
              {fieldErrors.correo && (
                <p id="correo-error" className="field-msg">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {fieldErrors.correo}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <label className="sr-only" htmlFor="contact-message">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                rows={4}
                maxLength={LIMITS.mensaje.max}
                placeholder="¿En qué podemos ayudarte?"
                {...fieldProps('mensaje')}
                className={`resize-none ${fieldProps('mensaje').className}`}
              />
              {fieldErrors.mensaje && (
                <p id="mensaje-error" className="field-msg">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {fieldErrors.mensaje}
                </p>
              )}
            </div>

            {/* Honeypot anti-spam: no es un campo real, el endpoint lo rechaza con 400. */}
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />

            <AnimatePresence>
              {formError && (
                <m.div
                  key="form-error"
                  role="alert"
                  className="form-alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span className="text-foreground">{formError}</span>
                </m.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={sending}
              className="bracket mx-auto flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Loader2 className="spinner h-4 w-4" aria-hidden="true" />
                  Enviando
                </>
              ) : (
                <>
                  Enviar correo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}
