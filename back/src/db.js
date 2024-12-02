const sql = require('mssql');

const config = {
    user: 'italoaurelio0',
    password: '009123ia',
    server: 'localhost',
    database: 'EscaladaParaoCeu', 
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado ao SQL Server!');
        return pool;
    })
    .catch(err => {
        console.error('Erro ao conectar ao SQL Server:', err);
    });

module.exports = poolPromise;