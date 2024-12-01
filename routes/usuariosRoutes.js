const express = require("express");
const router = express.Router();
const db = require("../dbConfig"); // Conexão com o banco
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Rota de cadastro
router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  // Validando os dados de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Query SQL para inserir o usuário
    const query = `
      INSERT INTO Usuarios (nome, email, senha)
      VALUES ('${nome}', '${email}', '${senhaCriptografada}');
    `;

    // Conectando ao banco e executando a query
    db.then(pool => {
      return pool.request().query(query)
        .then(result => {
          res.status(201).send("Usuário cadastrado com sucesso!");
        })
        .catch(err => {
          console.error("Erro ao cadastrar usuário:", err);
          res.status(500).send("Erro ao cadastrar usuário");
        });
    }).catch(err => {
      console.error("Erro de conexão:", err);
      res.status(500).send("Erro de conexão com o banco de dados");
    });

  } catch (error) {
    console.error("Erro ao criptografar a senha:", error);
    res.status(500).send("Erro ao criptografar a senha");
  }
});

// Rota de login
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const query = `SELECT * FROM Usuarios WHERE email = '${email}'`;

  db.then(pool => {
    return pool.request().query(query)
      .then(result => {
        const usuario = result.recordset[0];
        if (!usuario) {
          return res.status(404).send("Usuário não encontrado");
        }

        // Comparar a senha
        bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
          if (err) {
            return res.status(500).send("Erro ao verificar a senha");
          }

          if (!isMatch) {
            return res.status(400).send("Senha inválida");
          }

          // Gerar o token JWT
          const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            "seu_segredo_aqui", // Use uma chave secreta segura
            { expiresIn: "1h" }
          );

          res.status(200).json({ token });
        });
      })
      .catch(err => {
        console.error("Erro ao buscar usuário:", err);
        res.status(500).send("Erro ao buscar usuário");
      });
  }).catch(err => {
    console.error("Erro de conexão:", err);
    res.status(500).send("Erro de conexão com o banco de dados");
  });
});

// Rota para buscar todos os usuários
router.get("/", (req, res) => {
  const query = "SELECT * FROM Usuarios";

  db.then(pool => {
    return pool.request().query(query)
      .then(result => {
        res.status(200).json(result.recordset); // Retorna os dados dos usuários
      })
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        res.status(500).send("Erro ao buscar usuários");
      });
  }).catch(err => {
    console.error("Erro de conexão:", err);
    res.status(500).send("Erro de conexão com o banco de dados");
  });
});

module.exports = router;
