import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

function getUserIdFromCookie(request: NextRequest): string | null {
  const sessionToken = request.cookies.get('session')?.value
  if (!sessionToken) return null

  try {
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString())
    return sessionData.userId
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromCookie(request)
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { data: usuario } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single()

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const { data: perfil } = await supabaseAdmin
      .from('perfiles')
      .select('*')
      .eq('usuario_id', userId)
      .single()

    return NextResponse.json({
      user: {
        ...usuario,
        perfil: perfil || null,
      },
    })
  } catch (error) {
    console.error('Error in profile GET:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = getUserIdFromCookie(request)
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { nombre, bio, telefono, avatar_url, banner_url } = body

    // Actualizar usuario (nombre)
    if (nombre) {
      const { error: userError } = await supabaseAdmin
        .from('usuarios')
        .update({ nombre })
        .eq('id', userId)

      if (userError) {
        console.error('Error updating user:', userError)
        return NextResponse.json({ error: 'Error al actualizar nombre' }, { status: 500 })
      }
    }

    // Actualizar o crear perfil
    const { data: existingPerfil } = await supabaseAdmin
      .from('perfiles')
      .select('usuario_id')
      .eq('usuario_id', userId)
      .single()

    if (existingPerfil) {
      const { error: perfilError } = await supabaseAdmin
        .from('perfiles')
        .update({
          bio: bio ?? null,
          telefono: telefono ?? null,
          avatar_url: avatar_url ?? null,
          banner_url: banner_url ?? null,
        })
        .eq('usuario_id', userId)

      if (perfilError) {
        console.error('Error updating perfil:', perfilError)
        return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 })
      }
    } else {
      const { error: perfilError } = await supabaseAdmin
        .from('perfiles')
        .insert({
          usuario_id: userId,
          bio: bio ?? null,
          telefono: telefono ?? null,
          avatar_url: avatar_url ?? null,
          banner_url: banner_url ?? null,
        })

      if (perfilError) {
        console.error('Error creating perfil:', perfilError)
        return NextResponse.json({ error: 'Error al crear perfil' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: 'Perfil actualizado' })
  } catch (error) {
    console.error('Error in profile PUT:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}