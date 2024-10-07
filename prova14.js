const div = document.getElementById('resultado');

async function buscar_api(raça){
    const url = `https://dog.ceo/api/breed/${raça}/images/random`;
    try{
        const response = await fetch(url);
        const dados = await response.json();
        console.log(dados);
        exibir(dados['message']);
    }catch(e){
        console.log(e);
    }
}

function exibir(url_img){
    document.querySelector('#img').src = url_img;
}

// Adicionando eventos para cada botão com diferentes raças
document.getElementById('btn-husky').addEventListener('click', () => buscar_api('husky'));
document.getElementById('btn-pug').addEventListener('click', () => buscar_api('pug'));
document.getElementById('btn-labrador').addEventListener('click', () => buscar_api('labrador'));
