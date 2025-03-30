"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = void 0;
const tedious_1 = require("tedious");
const executeQuery = (connection, query) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const request = new tedious_1.Request(query, (err) => {
            if (err) {
                return reject(err);
            }
        });
        request.on("row", (columns) => {
            const row = {};
            columns.forEach((column) => {
                row[column.metadata.colName] = column.value;
            });
            results.push(row);
        });
        request.on("requestCompleted", () => {
            resolve(results);
        });
        connection.execSql(request);
    });
};
exports.executeQuery = executeQuery;
