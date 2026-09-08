import nodemailer from 'nodemailer'

export type ContactEmail = {
    nombre: string
    correo: string
    mensaje: string
}

function createTransporter() {
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!host || !port || !user || !pass) {
        throw new Error('SMTP service is not configured')
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user, pass },
    })
}

export async function sendContactEmails({ nombre, correo, mensaje }: ContactEmail) {
    const recipient = process.env.CONTACT_TO_EMAIL
    const sender = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER

    if (!recipient || !sender) {
        throw new Error('Contact email service is not configured')
    }

    const transporter = createTransporter()
    const safeName = nombre.replace(/[\r\n]/g, ' ')

    await transporter.sendMail({
        from: sender,
        to: recipient,
        replyTo: correo,
        subject: `Nuevo contacto desde Fuccina: ${safeName}`,
        text: `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`,
    })

    await transporter.sendMail({
        from: sender,
        to: correo,
        subject: 'Recibimos tu mensaje | Fuccina',
        text: `Hola ${nombre},\n\nGracias por contactarte con Fuccina. Recibimos tu mensaje y nos pondremos en contacto contigo a la brevedad.\n\nSaludos,\nEl equipo de Fuccina`,
    })
}