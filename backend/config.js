const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "Milka2706",
        database: "bdgestion",
        port: 3306,
        connectTimeout: 60000
    },
};

console.log('Configuración de BD:', config.db);
module.exports = config;