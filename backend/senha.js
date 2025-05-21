function senhaForte(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
}

app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!senhaForte(senha)) {
        return res.status(400).json({ message: 'Senha fraca. Use pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.' });
    }
});
