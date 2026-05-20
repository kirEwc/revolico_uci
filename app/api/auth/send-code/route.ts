import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateEmailHTML(code: string, isRegistro: boolean): string {
  const subject = isRegistro 
    ? 'Código de verificación - Revólico UCI' 
    : 'Código de inicio de sesión - Revólico UCI'

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f7fb;padding:40px 0;">
    <tr>
      <td align="center">
        <!-- CARD -->
        <table width="650" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);">
          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#ff8c1a 0%,#ffb347 100%);padding:40px 50px;position:relative;">
              <table width="100%">
                <tr>
                  <td align="left">
                    <!-- LOGO -->
                    <div style="width:58px;height:58px;border-radius:18px;background:white;text-align:center;line-height:58px;font-size:30px;font-weight:bold;color:#ff8c1a;box-shadow:0 6px 18px rgba(0,0,0,0.12);">R</div>
                  </td>
                  <td align="right">
                    <span style="color:white;font-size:14px;font-weight:600;letter-spacing:1px;opacity:0.9;">REVOLICO UCI</span>
                  </td>
                </tr>
              </table>
              <div style="height:35px;"></div>
              <h1 style="margin:0;color:white;font-size:36px;line-height:1.2;font-weight:800;">${isRegistro ? 'Activa tu cuenta' : 'Verifica tu cuenta'}</h1>
              <p style="margin:16px 0 0 0;color:rgba(255,255,255,0.92);font-size:17px;line-height:1.7;max-width:480px;">
                ${isRegistro 
                  ? 'Gracias por registrarte en Revólico UCI. Usa el siguiente código para verificar tu correo electrónico y activar tu cuenta de vendedor.'
                  : 'Estamos a un paso de activar tu acceso. Usa el siguiente código de verificación para continuar.'}
              </p>
            </td>
          </tr>
          <!-- BODY -->
          <tr>
            <td style="padding:50px;">
              <p style="margin:0;color:#111827;font-size:18px;font-weight:600;">Hola 👋</p>
              <p style="margin:18px 0 35px 0;color:#6b7280;font-size:16px;line-height:1.8;">
                ${isRegistro 
                  ? 'Para completar tu registro, introduce este código dentro de la plataforma.'
                  : 'Recibimos una solicitud para iniciar sesión en tu cuenta. Introduce este código dentro de la plataforma para completar la autenticación.'}
              </p>
              <!-- CODE BOX -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="background:linear-gradient(135deg,#fff8f0 0%,#fff1df 100%);border:2px dashed #ffb347;border-radius:24px;padding:35px 20px;">
                      <p style="margin:0 0 14px 0;color:#ff8c1a;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Código de verificación</p>
                      <div style="font-size:48px;letter-spacing:14px;font-weight:800;color:#111827;font-family:monospace;">${code}</div>
                    </div>
                  </td>
                </tr>
              </table>
              <div style="height:35px;"></div>
              <!-- INFO CARDS -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48%" valign="top" style="background:#f8fafc;border-radius:18px;padding:20px;">
                    <div style="font-size:24px;">⏳</div>
                    <h3 style="margin:12px 0 8px 0;font-size:17px;color:#111827;">Expira pronto</h3>
                    <p style="margin:0;color:#6b7280;line-height:1.6;font-size:14px;">Este código será válido durante los próximos 10 minutos.</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" valign="top" style="background:#f8fafc;border-radius:18px;padding:20px;">
                    <div style="font-size:24px;">🔒</div>
                    <h3 style="margin:12px 0 8px 0;font-size:17px;color:#111827;">Seguridad primero</h3>
                    <p style="margin:0;color:#6b7280;line-height:1.6;font-size:14px;">Nunca compartas este código con nadie, ni siquiera con soporte.</p>
                  </td>
                </tr>
              </table>
              <div style="height:45px;"></div>
            </td>
          </tr>
          <!-- FOOTER -->
          <tr>
            <td style="background:#0f172a;padding:35px 50px;">
              <table width="100%">
                <tr>
                  <td align="left">
                    <p style="margin:0;color:white;font-size:18px;font-weight:700;">Revolico UCI</p>
                    <p style="margin:10px 0 0 0;color:#94a3b8;font-size:14px;line-height:1.7;">Marketplace moderno diseñado para conectar compradores y vendedores de manera rápida y segura.</p>
                  </td>
                </tr>
              </table>
              <div style="height:1px;background:rgba(255,255,255,0.08);margin:28px 0;"></div>
              <p style="margin:0;text-align:center;color:#64748b;font-size:13px;line-height:1.7;">Si no solicitaste este código, puedes ignorar este mensaje.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

async function sendEmail(to: string, code: string, isRegistro: boolean) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.correo,
      pass: process.env.pass_correo,
    },
  })

  const mailOptions = {
    from: '"Revólico UCI" <revolicouci@gmail.com>',
    to,
    subject: isRegistro 
      ? 'Código de verificación - Revólico UCI' 
      : 'Código de inicio de sesión - Revólico UCI',
    html: generateEmailHTML(code, isRegistro),
  }

  return transporter.sendMail(mailOptions)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, isRegistro = false } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      )
    }

    // Generar código de 6 dígitos
    const codigo = generateVerificationCode()

    // Calcular expiración (10 minutos)
    const expiracion = new Date(Date.now() + 10 * 60 * 1000).toISOString()

    // Eliminar códigos anteriores no usados para este email
    await supabaseAdmin
      .from('verification_codes')
      .delete()
      .eq('email', email)

    // Insertar nuevo código
    const { error: insertError } = await supabaseAdmin
      .from('verification_codes')
      .insert({
        email,
        codigo,
        expiracion,
        used: false,
      })

    if (insertError) {
      console.error('Error inserting code:', insertError)
      return NextResponse.json(
        { error: 'Error al generar código de verificación' },
        { status: 500 }
      )
    }

    // Enviar email
    try {
      await sendEmail(email, codigo, isRegistro)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      return NextResponse.json(
        { error: 'Error al enviar el correo electrónico' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Código de verificación enviado' 
    })

  } catch (error) {
    console.error('Error in send-code:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}