import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

export async function GET(request: NextRequest) {
  try {
    const cookieStore = request.cookies
    const sessionToken = cookieStore.get('session')?.value

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    // Decodificar token
    let sessionData
    try {
      sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    } catch {
      return NextResponse.json(
        { error: 'Sesión inválida' },
        { status: 401 }
      )
    }

    // Obtener usuario
    const { data: usuario, error } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('id', sessionData.userId)
      .single()

    if (error || !usuario) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Obtener perfil
    const { data: perfil } = await supabaseAdmin
      .from('perfiles')
      .select('*')
      .eq('usuario_id', usuario.id)
      .single()

    return NextResponse.json({
      user: {
        ...usuario,
        perfil: perfil || null,
      },
    })

  } catch (error) {
    console.error('Error in me:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}