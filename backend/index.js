const express = require('express');
const cors = require('cors');
const db = require('./services/db');

const app = express();
const port = 3030;

console.log('1. Iniciando servidor...');

app.use(cors());
app.use(express.json());

console.log('2. Middlewares configurados');

app.get('/test', (req, res) => {
    console.log('✅ Ruta /test accedida');
    res.json({ message: 'Servidor funcionando' });
});

app.get('/login', async (req, res) => {
    try {
        console.log('📨 Recibida petición login:', req.query);

        const { user, password } = req.query;

        if (!user || !password) {
            return res.status(400).json({
                error: 'Usuario y contraseña requeridos'
            });
        }

        const rows = await db.query(`
            SELECT nombre, rol 
            FROM usuarios 
            WHERE login = '${user}'
            AND password = '${password}'
        `);

        console.log('Resultado de la consulta:', rows);

        if (rows.length > 0) {
            res.json({
                data: rows,
                message: 'Login exitoso'
            });
        } else {
            res.json({
                data: [],
                message: 'Credenciales incorrectas'
            });
        }

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            error: 'Error del servidor',
            details: error.message
        });
    }
});

// ... después de la ruta /login ...

// Ruta para agregar items
app.get('/addItem', async (req, res) => {
    try {
        console.log('📨 Recibida petición addItem:', req.query);

        const { nombre, marca, tipo, precio } = req.query;

        if (!nombre || !marca || !tipo || !precio) {
            return res.status(400).json({
                error: 'Todos los campos son requeridos: nombre, marca, tipo, precio'
            });
        }

        const result = await db.query(
            `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`,
            [nombre, marca, tipo, precio]
        );

        console.log('✅ Item agregado:', result);

        res.json({
            success: true,
            message: 'Item agregado correctamente',
            affectedRows: result.affectedRows
        });

    } catch (error) {
        console.error('❌ Error agregando item:', error);
        res.status(500).json({
            error: 'Error del servidor',
            details: error.message
        });
    }
});

// Ruta para borrar items
app.get('/deleteItem', async (req, res) => {
    try {
        console.log('📨 Recibida petición deleteItem:', req.query);

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({
                error: 'ID es requerido'
            });
        }

        const result = await db.query(
            `DELETE FROM coleccion WHERE id = ?`,
            [id]
        );

        console.log('✅ Item eliminado:', result);

        if (result.affectedRows > 0) {
            res.json({
                success: true,
                message: 'Item eliminado correctamente',
                affectedRows: result.affectedRows
            });
        } else {
            res.json({
                success: false,
                message: 'No se encontró el item con ese ID'
            });
        }

    } catch (error) {
        console.error('❌ Error eliminando item:', error);
        res.status(500).json({
            error: 'Error del servidor',
            details: error.message
        });
    }
});

// Ruta para obtener todos los items
app.get('/getItems', async (req, res) => {
    try {
        console.log('📨 Recibida petición getItems');

        const rows = await db.query(`SELECT * FROM coleccion`);

        res.json({
            data: rows,
            message: 'Items obtenidos correctamente'
        });

    } catch (error) {
        console.error('❌ Error obteniendo items:', error);
        res.status(500).json({
            error: 'Error del servidor',
            details: error.message
        });
    }
});

console.log('3. Rutas configuradas');

app.listen(port, () => {
    console.log('servidor corriendo en http://localhost:${port}');
});

console.log('4. app.listen ejecutado');