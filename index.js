const express = require("express");
const cors = require("cors");  // Se você precisar de CORS
const db = require("./dbConfig"); // Conexão com o banco
const usuariosRoutes = require("./routes/usuariosRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());  // Middleware para aceitar JSON
app.use(cors());  // Middleware para CORS, se necessário

// Rotas de usuários
app.use("/usuarios", usuariosRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("Bem-vindo ao Escalada para o Céu!");
});

// Conectar com o banco e iniciar o servidor
db.then(() => {
  console.log("Conexão com o banco bem-sucedida!");

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Erro ao conectar ao banco:", err);
});
