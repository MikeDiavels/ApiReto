"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const tedious_1 = require("tedious");
//Declaro la configuración de la conexión a la base de datos
// y la exporto para poder usarla en el resto de la aplicación
const config = {
    server: "SYS-41",
    authentication: {
        type: "default",
        options: {
            userName: "sa",
            password: "MA2020di",
        },
    },
    options: {
        database: "RetoTecnico",
        encrypt: true,
        trustServerCertificate: true,
    },
};
//realizo la conexión a la base de datos y la exporto para poder usarla en el resto de la aplicación
// Declaro la función getConnection que devuelve una promesa de tipo Connection
const getConnection = () => {
    return new Promise((resolve, reject) => {
        const connection = new tedious_1.Connection(config);
        connection.on("connect", (err) => {
            if (err) {
                return reject(err);
            }
            console.log("Conexión exitosa a SQL Server");
            resolve(connection);
        });
        connection.connect();
    });
};
exports.getConnection = getConnection;
