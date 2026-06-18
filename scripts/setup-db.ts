import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.service_role_key!

async function setupDatabase() {
  console.log('Creando tablas en Supabase...')

  const tables = [
    `CREATE TABLE IF NOT EXISTS usuarios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );`,
    `CREATE TABLE IF NOT EXISTS perfiles (
      usuario_id UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
      avatar_url TEXT,
      banner_url TEXT,
      bio TEXT,
      telefono TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS productos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      vendor_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10,2) NOT NULL,
      imagenes TEXT[] DEFAULT '{}',
      categoria TEXT NOT NULL,
      estado TEXT DEFAULT 'activo',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );`,
    `CREATE TABLE IF NOT EXISTS verification_codes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      codigo TEXT NOT NULL,
      expiracion TIMESTAMPTZ NOT NULL,
      used BOOLEAN DEFAULT FALSE
    );`
  ]

  for (const sql of tables) {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Prefer': 'params=single-object'
      },
      body: JSON.stringify({ query: sql })
    })
    console.log('Tabla creada:', res.status)
  }

  console.log('✅ Base de datos creada')
}

setupDatabase().catch(console.error)