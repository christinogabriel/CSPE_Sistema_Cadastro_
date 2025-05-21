const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('./db'); // conexão mysql2

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('API rodando perfeitamente irmão!');
});

// Cadastro

app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const hash = bcrypt.hashSync(senha, 10);

    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

    db.query(sql, [nome.trim(), email.trim(), hash], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Email já cadastrado' });
            }
            return res.status(500).json({ message: 'Erro no servidor', erro: err });
        }
        res.json({ message: 'Usuário cadastrado com sucesso' });
    });
});



// Login


app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor', erro: err });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Email não cadastrado' });
        }

        const usuario = results[0];

        const check = bcrypt.compareSync(senha, usuario.senha);
        if (!check) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        res.json({ message: 'Login bem-sucedido', nome: usuario.nome });
    });
});



// Servidor


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


