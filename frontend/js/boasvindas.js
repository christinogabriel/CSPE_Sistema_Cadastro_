document.getElementById('bemvindo').innerText = 'Bem-vindo, ' + localStorage.getItem('nomeUsuario') + '!';

function logout() {
    localStorage.removeItem('nomeUsuario');
    window.location.href = 'index.html';
}