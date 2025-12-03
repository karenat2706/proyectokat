import db from './db.js';
import helper from './helper.js';

async function insertData(req, res) {
    const data = req.query;
    await db.query(
        `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (:nombre, :marca, :tipo, :precio)`,
        {
            nombre: data.nombre,
            marca: data.marca,
            tipo: data.tipo,
            precio: data.precio
        }
    );
    return 1; // Simulamos affectedRows
}

async function getData(req, res) {
    const rows = await db.query(`SELECT * FROM coleccion`);
    const data = helper.emptyOrRows(rows);
    return {
        data
    };
}

async function deleteData(req, res) {
    const data = req.query;
    await db.query(
        `DELETE FROM coleccion WHERE id = :id`,
        { id: data.id }
    );
    return 1; // Simulamos affectedRows
}

app.get('/getItems', async (req, res) => {
    try {
        console.log('📊 Petición getItems recibida');
        const rows = await db.query(`SELECT * FROM coleccion`);
        console.log(`📊 ${rows.length} registros encontrados`);
        res.json({ data: rows });
    } catch (error) {
        console.error('❌ Error en getItems:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

export default {
    getData,
    insertData,
    deleteData
};