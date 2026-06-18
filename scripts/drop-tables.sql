-- Eliminar todas las tablas y empezar de cero

DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS perfiles CASCADE;
DROP TABLE IF EXISTS verification_codes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

SELECT '✅ Todas las tablas eliminadas' as mensaje;