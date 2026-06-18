import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

async function resetDatabase() {
  console.log('Borrando todos los datos de las tablas...')

  // Borrar en orden para evitar problemas de FK
  await supabaseAdmin.from('productos').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabaseAdmin.from('perfiles').delete().neq('usuario_id', '00000000-0000-0000-0000-000000000000')
  await supabaseAdmin.from('verification_codes').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabaseAdmin.from('usuarios').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  console.log('✓ Datos borrados')

  // Also reset auth users (this requires listing and deleting)
  const { data: users } = await supabaseAdmin.auth.admin.listUsers()
  if (users?.users) {
    for (const user of users.users) {
      await supabaseAdmin.auth.admin.deleteUser(user.id)
    }
    console.log('✓ Usuarios de Auth borrados')
  }

  console.log('✅ Base de datos reseteada')
}

resetDatabase().catch(console.error)