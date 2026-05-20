import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, codigo, nombre } = body

    if (!email || !codigo) {
      return NextResponse.json(
        { error: 'Email y código son requeridos' },
        { status: 400 }
      )
    }

    // Buscar el código válido
    const { data: verification, error: findError } = await supabaseAdmin
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('codigo', codigo)
      .eq('used', false)
      .gt('expiracion', new Date().toISOString())
      .single()

    if (findError || !verification) {
      return NextResponse.json(
        { error: 'Código inválido o expirado' },
        { status: 400 }
      )
    }

    // Marcar código como usado
    await supabaseAdmin
      .from('verification_codes')
      .update({ used: true })
      .eq('id', verification.id)

    // Verificar si el usuario ya existe
    let usuario
    const { data: existingUser } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      usuario = existingUser
    } else {
      // Crear nuevo usuario (registro)
      if (!nombre) {
        return NextResponse.json(
          { error: 'Nombre es requerido para registro' },
          { status: 400 }
        )
      }

      // Crear usuario en auth de Supabase
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: { nombre },
      })

      if (authError) {
        console.error('Error creating auth user:', authError)
        return NextResponse.json(
          { error: 'Error al crear usuario' },
          { status: 500 }
        )
      }

      // Crear usuario en tabla usuarios
      const { data: newUser, error: userError } = await supabaseAdmin
        .from('usuarios')
        .insert({
          id: authData.user.id,
          email,
          nombre,
        })
        .select()
        .single()

      if (userError) {
        console.error('Error creating user:', userError)
        return NextResponse.json(
          { error: 'Error al crear usuario' },
          { status: 500 }
        )
      }

      // Crear perfil vacío
      await supabaseAdmin
        .from('perfiles')
        .insert({
          usuario_id: authData.user.id,
        })

      usuario = newUser
    }

    // Generar token de sesión (JWT simple)
    const sessionToken = Buffer.from(
      JSON.stringify({ userId: usuario.id, email: usuario.email })
    ).toString('base64')

    // Guardar cookie de sesión
    const cookieStore = await cookies()
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    return NextResponse.json({
      success: true,
      message: 'Verificación exitosa',
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
      },
    })

  } catch (error) {
    console.error('Error in verify-code:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}