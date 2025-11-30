//Importamos de la librería mysql2 el metodo que nos sirve para conectarnos con la base de datos
const mysql = require('mysql2/promise')
//Importamos el fichero config.js donde están las credenciales de la base de datos con la que nos vamos a conectar
const config = require('../config')

//A través de una función asíncrona:
//1. Creamos la conexión con la base de datos (mysql.createConnection) con las credenciales proporcionadas en la const db del fichero config (config.db)
//2. Nos conectamos a la base de datos proporcionándole la consulta sql y los parámetros que nos pasan.
async function query(sql, params) {
    const connection = await mysql.createConnection(config.db)
    const [results] = await connection.execute(sql, params)

    return results
}

module.exports = {
    query
}