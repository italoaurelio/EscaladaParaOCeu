const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/verificarToken");
const db = require("../dbConfig");

// Rota para criar evento (protegida)
router.post("/events", verificarToken, async (req, res) => {
    const { titulo, descricao, inicio, fim } = req.body;
    const usuarioId = req.usuario.id;  // O ID do usuário vem do token JWT

    const query = `
        INSERT INTO Eventos (titulo, descricao, inicio, fim, usuario_id)
        VALUES (@titulo, @descricao, @inicio, @fim, @usuarioId);
    `;

    try {
        await db.then(pool => {
            return pool.request()
                .input('titulo', titulo)
                .input('descricao', descricao)
                .input('inicio', inicio)
                .input('fim', fim)
                .input('usuarioId', usuarioId)
                .query(query);
        });
        res.status(201).send("Evento criado com sucesso!");
    } catch (err) {
        console.error("Erro ao criar evento:", err);
        res.status(500).send("Erro ao criar evento");
    }
});

// Rota para buscar eventos do usuário (protegida)
router.get("/events", verificarToken, async (req, res) => {
    const usuarioId = req.usuario.id;  // O ID do usuário vem do token JWT

    const query = `
        SELECT * FROM Eventos WHERE usuario_id = @usuarioId;
    `;

    try {
        const result = await db.then(pool => {
            return pool.request()
                .input('usuarioId', usuarioId)
                .query(query);
        });
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error("Erro ao buscar eventos:", err);
        res.status(500).send("Erro ao buscar eventos");
    }
});

module.exports = router;
