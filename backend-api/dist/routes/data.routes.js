"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../db/connection");
const queries_1 = require("../db/queries");
const router = (0, express_1.Router)();
// CREATE
router.post("/", async (req, res) => {
    const { nombre } = req.body;
    const query = `INSERT INTO tu_tabla (nombre) VALUES ('${nombre}')`;
    try {
        const connection = await (0, connection_1.getConnection)();
        await (0, queries_1.executeQuery)(connection, query);
        res.status(201).json({ message: "Dato creado" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// READ
router.get("/", async (_req, res) => {
    const query = "SELECT * FROM tu_tabla";
    try {
        const connection = await (0, connection_1.getConnection)();
        const results = await (0, queries_1.executeQuery)(connection, query);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// UPDATE
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = `UPDATE tu_tabla SET nombre = '${nombre}' WHERE id = ${id}`;
    try {
        const connection = await (0, connection_1.getConnection)();
        await (0, queries_1.executeQuery)(connection, query);
        res.json({ message: "Dato actualizado" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM tu_tabla WHERE id = ${id}`;
    try {
        const connection = await (0, connection_1.getConnection)();
        await (0, queries_1.executeQuery)(connection, query);
        res.json({ message: "Dato eliminado" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
