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

// GET - Listar productos del vendedor
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromCookie(request)
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { data: productos, error } = await supabaseAdmin
      .from('productos')
      .select('*')
      .eq('vendor_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching productos:', error)
      return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 })
    }

    return NextResponse.json({ productos: productos || [] })
  } catch (error) {
    console.error('Error in productos GET:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// POST - Crear producto
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromCookie(request)
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { titulo, descripcion, precio, imagenes, categoria, estado = 'activo' } = body

    if (!titulo || !precio || !categoria) {
      return NextResponse.json(
        { error: 'Título, precio y categoría son requeridos' },
        { status: 400 }
      )
    }

    const { data: producto, error } = await supabaseAdmin
      .from('productos')
      .insert({
        vendor_id: userId,
        titulo,
        descripcion: descripcion || null,
        precio,
        imagenes: imagenes || [],
        categoria,
        estado,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating producto:', error)
      return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
    }

    return NextResponse.json({ success: true, producto })
  } catch (error) {
    console.error('Error in productos POST:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PUT - Actualizar producto
export async function PUT(request: NextRequest) {
  try {
    const userId = getUserIdFromCookie(request)
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const body = await request.json()
    const { id, titulo, descripcion, precio, imagenes, categoria, estado } = body

    if (!id) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 })
    }

    // Verificar que el producto pertenece al vendedor
    const { data: existing } = await supabaseAdmin
      .from('productos')
      .select('vendor_id')
      .eq('id', id)
      .single()

    if (!existing || existing.vendor_id !== userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const updateData: Record<string, unknown> = {}
    if (titulo !== undefined) updateData.titulo = titulo
    if (descripcion !== undefined) updateData.descripcion = descripcion
    if (precio !== undefined) updateData.precio = precio
    if (imagenes !== undefined) updateData.imagenes = imagenes
    if (categoria !== undefined) updateData.categoria = categoria
    if (estado !== undefined) updateData.estado = estado

    const { data: producto, error } = await supabaseAdmin
      .from('productos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating producto:', error)
      return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 })
    }

    return NextResponse.json({ success: true, producto })
  } catch (error) {
    console.error('Error in productos PUT:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserIdFromCookie(request)
    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 })
    }

    // Verificar que el producto pertenece al vendedor
    const { data: existing } = await supabaseAdmin
      .from('productos')
      .select('vendor_id')
      .eq('id', id)
      .single()

    if (!existing || existing.vendor_id !== userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const { error } = await supabaseAdmin
      .from('productos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting producto:', error)
      return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in productos DELETE:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}