function senhaForte(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
}

document.getElementById('cadastroForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const verificacao = document.getElementById('verificacaoCadastro').value;

    if (senha !== confirmarSenha) {
        document.getElementById('mensagem').innerText = 'As senhas não conferem.';
        return;
    }

    if (!senhaForte(senha)) {
        document.getElementById('mensagem').innerText = 'Senha fraca. Use pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.';
        return;
    }

    if (verificacao.trim() !== '8') {
        document.getElementById('mensagem').innerText = 'Verificação de humano incorreta.';
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'index.html';  // Corrigido aqui
        } else {
            document.getElementById('mensagem').innerText = dados.message;
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('mensagem').innerText = 'Erro ao conectar com o servidor.';
    }
});
