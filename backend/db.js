const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         
    password: '',       
    database: 'cadastro'
});

db.connect(err => {
    if (err) {
        console.error('Erro na conexão:', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

module.exports = db;
