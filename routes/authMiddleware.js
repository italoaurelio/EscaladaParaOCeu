const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Acesso negado. Sem token.");
    }

    try {
        const decoded = jwt.verify(token, "seu_segredo_aqui"); // Use a mesma chave secreta
        req.usuario = decoded; // Adiciona as informações do usuário ao request
        next();
    } catch (error) {
        res.status(400).send("Token inválido.");
    }
}

module.exports = verificarToken;