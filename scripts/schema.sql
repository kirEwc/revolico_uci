-- REVOLICO UCI - Schema de Base de Datos

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

-- Habilitar Row Level Security (RLS)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para usuarios
CREATE POLICY "Usuarios son visibles solo para su owner" ON usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Cualquiera puede insertar usuarios" ON usuarios
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON usuarios
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para perfiles
CREATE POLICY "Perfiles visibles para el owner" ON perfiles
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Cualquiera puede crear perfiles" ON perfiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Perfiles editables por owner" ON perfiles
  FOR UPDATE USING (auth.uid() = usuario_id);

-- Políticas RLS para productos
CREATE POLICY "Productos visibles públicamente" ON productos
  FOR SELECT USING (estado = 'activo');

CREATE POLICY "Vendedores pueden crear productos" ON productos
  FOR INSERT WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendedores pueden editar sus productos" ON productos
  FOR UPDATE USING (auth.uid() = vendor_id);

CREATE POLICY "Vendedores pueden eliminar sus productos" ON productos
  FOR DELETE USING (auth.uid() = vendor_id);

-- Políticas RLS para verification_codes (solo service role)
CREATE POLICY "Cualquiera puede usar verification_codes" ON verification_codes
  FOR ALL USING (true);