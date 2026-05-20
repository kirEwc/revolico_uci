import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createTables() {
  console.log('Creando tablas en Supabase...')

  // Tabla usuarios
  const { error: usuariosError } = await supabaseAdmin.from('usuarios').upsert({
    id: '00000000-0000-0000-0000-000000000001',
    email: 'test@test.com',
    nombre: 'Test User',
  }, { onConflict: 'id' }).throwOnError()

  // Actually create the table via SQL
  const { data, error } = await supabaseAdmin.rpc('exec_sql', {
    sql: `
      -- Tabla usuarios
      CREATE TABLE IF NOT EXISTS usuarios (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        nombre TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Tabla perfiles
      CREATE TABLE IF NOT EXISTS perfiles (
        usuario_id UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
        avatar_url TEXT,
        banner_url TEXT,
        bio TEXT,
        telefono TEXT
      );

      -- Tabla productos
      CREATE TABLE IF NOT EXISTS productos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vendor_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        imagenes TEXT[] DEFAULT '{}',
        categoria TEXT NOT NULL,
        estado TEXT DEFAULT 'activo',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Tabla verification_codes
      CREATE TABLE IF NOT EXISTS verification_codes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL,
        codigo TEXT NOT NULL,
        expiracion TIMESTAMPTZ NOT NULL,
        used BOOLEAN DEFAULT FALSE
      );
    `
  })

  console.log('Tables created!', { data, error })
}

createTables().catch(console.error)