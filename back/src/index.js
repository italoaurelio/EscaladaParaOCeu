const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const poolPromise = new sql.ConnectionPool({
  user: 'italoaurelio0',
  password: '009123ia',
  server: 'localhost',
  database: 'EscaladaParaoCeu',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
}).connect()
.then(pool => {
    console.log('Conectado ao SQL Server!');
    return pool;
})
.catch(err => {
    console.error('Erro ao conectar ao SQL Server:', err);
});;

app.post('/cadastro', async (req, res) => {
    console.log('Dados recebidos no cadastro:', req.body);
    const { Nome, Email, Senha } = req.body;
  
    try {
      const pool = await poolPromise;
  
      // Verificar se o email já existe
      const result = await pool.request()
        .input('Email', sql.NVarChar, Email)
        .query('SELECT * FROM dbo.Usuarios WHERE Email = @Email');
      
      console.log('Resultado da consulta ao banco de dados:', result.recordset);
  
      if (result.recordset.length > 0) {
        return res.status(400).json({ message: 'Este email já está cadastrado.' });
      }
  
      // Criptografando a senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Senha, salt);
      console.log('Senha criptografada:', hashedPassword);
  
      // Inserir novo usuário no banco de dados
      const insertResult = await pool.request()
        .input('Nome', sql.NVarChar, Nome)
        .input('Email', sql.NVarChar, Email)
        .input('Senha', sql.NVarChar, hashedPassword)
        .query('INSERT INTO dbo.Usuarios (Nome, Email, Senha) VALUES (@Nome, @Email, @Senha)');
      
      console.log('Resultado da inserção no banco de dados:', insertResult);
  
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }
  });

app.post('/login', async (req, res) => {
  const { Email, Senha } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Email', sql.NVarChar, Email)
      .query('SELECT * FROM dbo.Usuarios WHERE Email = @Email');

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    const usuario = result.recordset[0];

    const isMatch = await bcrypt.compare(Senha, usuario.Senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign({ UsuarioID: usuario.UsuarioID, Email: usuario.Email }, 'seu-segredo', { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido!', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});

app.get('/paroquias', async (req, res) => {
    try {
        console.log('Iniciando busca por paróquias');
        const pool = await poolPromise;
        console.log('Conexão com o banco estabelecida');
        const result = await pool.request().query('SELECT Nome, Endereco FROM dbo.Paroquias');
        console.log('Dados retornados:', result.recordset);
        res.json(result.recordset);
    } catch (error) {
        console.error('Erro ao buscar paróquias:', error);
        res.status(500).json({ message: 'Erro ao buscar paróquias.' });
    }
});

app.post('/ministerios', async (req, res) => {
    const { nome, paroquiaId, usuarioId } = req.body;

    try {
        const pool = await poolPromise;

        // Inserir ministério no banco de dados
        const insertResult = await pool.request()
            .input('Nome', sql.NVarChar, nome)
            .input('ParoquiaId', sql.Int, paroquiaId)
            .input('CoordenadorID', sql.Int, usuarioId)
            .query('INSERT INTO dbo.Ministerios (Nome, ParoquiaId, CoordenadorID) VALUES (@Nome, @ParoquiaId, @CoordenadorID)');

        res.status(201).json({ message: 'Ministério criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar ministério:', error);
        res.status(500).json({ message: 'Erro ao cadastrar ministério.' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
