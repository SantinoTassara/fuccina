import { NextResponse } from 'next/server'

import { CONTACT_LIMITS } from '@/lib/contact-limits'

import { sendContactEmails } from './mailer'

type ContactPayload = {
    nombre?: unknown
    correo?: unknown
    mensaje?: unknown
    website?: unknown
}

type ValidContactPayload = {
    nombre: string
    correo: string
    mensaje: string
}

type RateLimitEntry = {
    count: number
    resetAt: number
}

const maxRequestBytes = 10_000
// Los límites por campo vienen de la fuente compartida con el formulario
// (`lib/contact-limits.ts`) para que cliente y servidor no puedan divergir.
const maxNameLength = CONTACT_LIMITS.nombre
const maxEmailLength = CONTACT_LIMITS.correo
const maxMessageLength = CONTACT_LIMITS.mensaje
const rateLimitWindowMs = 10 * 60 * 1_000
const rateLimitMaxRequests = 5
const requestsByIp = new Map<string, RateLimitEntry>()

function isValidPayload(payload: unknown): payload is ValidContactPayload & ContactPayload {
    if (!payload || typeof payload !== 'object') return false

    const contactPayload = payload as ContactPayload
    return (
        typeof contactPayload.nombre === 'string' &&
        contactPayload.nombre.trim().length > 0 &&
        contactPayload.nombre.trim().length <= maxNameLength &&
        typeof contactPayload.correo === 'string' &&
        contactPayload.correo.trim().length <= maxEmailLength &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactPayload.correo.trim()) &&
        typeof contactPayload.mensaje === 'string' &&
        contactPayload.mensaje.trim().length > 0 &&
        contactPayload.mensaje.trim().length <= maxMessageLength
    )
}

function isRateLimited(ip: string) {
    const now = Date.now()
    const current = requestsByIp.get(ip)

    if (!current || current.resetAt <= now) {
        requestsByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs })
        return false
    }

    current.count += 1
    return current.count > rateLimitMaxRequests
}

export async function POST(request: Request) {
    const contentLength = Number(request.headers.get('content-length') ?? 0)
    if (contentLength > maxRequestBytes) {
        return NextResponse.json({ error: 'Request is too large' }, { status: 413 })
    }

    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    let payload: unknown
    try {
        payload = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    if (!isValidPayload(payload)) {
        return NextResponse.json({ error: 'Missing or invalid contact fields' }, { status: 400 })
    }

    if (typeof payload.website === 'string' && payload.website.trim()) {
        return NextResponse.json({ error: 'Missing or invalid contact fields' }, { status: 400 })
    }

    try {
        await sendContactEmails({
            nombre: payload.nombre.trim(),
            correo: payload.correo.trim(),
            mensaje: payload.mensaje.trim(),
        })
    } catch (error) {
        console.error('Contact email failed', error)
        return NextResponse.json({ error: 'Could not send contact emails' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
}