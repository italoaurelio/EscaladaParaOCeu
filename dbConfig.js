const sql = require("mssql");

const config = {
    user: "italoaurelio0",
    password: "009123ia",
    server: "localhost", // ou o endereço do servidor
    database: "EscaladaParaoCeu",
    options: {
        encrypt: true, // Para localhost
        trustServerCertificate: true
    }
};

const db = sql.connect(config)
  .then(pool => pool) // Retorna a pool de conexão quando for bem-sucedido
  .catch(err => {
    console.error("Erro ao conectar ao banco:", err);
    throw err;
  });

module.exports = db;