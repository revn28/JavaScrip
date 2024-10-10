const div = document.getElementById('resultado');


async function buscarApi(raça) {
    const url = `https://dog.ceo/api/breed/${raça}/images/random`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const dados = await response.json();
        exibirImagem(dados.message);
    } catch (erro) {
        console.error("Erro ao buscar a imagem:", erro);
    }
}


function exibirImagem(urlImg) {
    const imgElemento = document.querySelector('#img');
    imgElemento.src = urlImg;
}


function adicionarEventoClickParaBotoes() {
    const botoes = document.querySelectorAll('button[data-raça]'); 
    
    botoes.forEach(botao => {
        const raça = botao.getAttribute('data-raça'); 
        botao.addEventListener('click', () => buscarApi(raça));
    });
}


document.addEventListener('DOMContentLoaded', adicionarEventoClickParaBotoes);
