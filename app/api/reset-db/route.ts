import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

export async function POST() {
  try {
    // Delete in order to avoid FK issues
    await supabaseAdmin.from('productos').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('perfiles').delete().neq('usuario_id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('verification_codes').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('usuarios').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // Delete auth users
    const { data: users } = await supabaseAdmin.auth.admin.listUsers()
    if (users?.users) {
      for (const user of users.users) {
        await supabaseAdmin.auth.admin.deleteUser(user.id)
      }
    }

    return NextResponse.json({ success: true, message: 'Base de datos reseteada' })
  } catch (error) {
    console.error('Error resetting DB:', error)
    return NextResponse.json({ error: 'Error al resetear base de datos' }, { status: 500 })
  }
}