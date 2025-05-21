document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const verificacao = document.getElementById('verificacaoLogin')?.value; // Verifica se existe esse campo

    // Se tiver a pergunta de verificação na tela de login
    if (verificacao !== undefined && verificacao.trim() !== '8') {
        document.getElementById('mensagem').innerText = 'Verificação de humano incorreta.';
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            localStorage.setItem('nomeUsuario', dados.nome);
            window.location.href = 'boasvindas.html';
        } else {
            document.getElementById('mensagem').innerText = dados.message;
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('mensagem').innerText = 'Erro ao conectar com o servidor.';
    }
});