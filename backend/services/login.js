const db = require('./db')
const helper = require('./helper')

//Realizamos la query a la base de datos buscando el nombre y rol pertenecientes al login y password proporcionados
async function getUserData (user, password) {
    const rows = await db.query(`
        select nombre, rol
        from usuarios
        where login = '${user}'
          and password = '${password}'

    `)

    const data = helper.emptyOrRows(rows[0])

    return {
        data
    }
}

//Exporto la función getUserData para poder usarla en otro fichero
module.exports = {
    getUserData
}
