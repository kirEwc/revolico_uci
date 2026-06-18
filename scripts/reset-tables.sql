-- Reset Database - Borra todos los datos

-- Borrar datos de las tablas (en orden para evitar problemas de FK)
DELETE FROM productos;
DELETE FROM perfiles;
DELETE FROM verification_codes;
DELETE FROM usuarios;

--reiniciar secuencias si es necesario (opcional)
-- ALTER SEQUENCE usuarios_id_seq RESTART WITH 1;

SELECT '✅ Base de datos reseteada' as mensaje;