// Array para armazenar os livros
let catalogo = [];

// Função para adicionar um livro
function addlivro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const ano = document.getElementById('ano').value;

    if (titulo && autor && genero && ano) {
        // Cria um objeto livro
        const livro = {
            titulo: titulo,
            autor: autor,
            genero: genero,
            ano: ano,
            rating: 0,
            reviews: []
        };

        // Adiciona o livro ao array e salva no localStorage
        catalogo.push(livro);
        salvaCatalogo();
        displaycatalogo();

        // Limpa os campos de entrada
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('genero').value = '';
        document.getElementById('ano').value = '';
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para salvar os livros no localStorage
function salvaCatalogo() {
    localStorage.setItem('catalogo', JSON.stringify(catalogo));
}

// Função para carregar os livros do localStorage
function loadCatalogo() {
    const storedcatalogo = localStorage.getItem('catalogo');
    if (storedcatalogo) {
        catalogo = JSON.parse(storedcatalogo);
    }
    displaycatalogo();
}

// Função para exibir os livros na página
function displaycatalogo(filtrarCatalogo = catalogo) {
    const bookList = document.getElementById('listaLivro');
    bookList.innerHTML = '';

    filtrarCatalogo.forEach((livro, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'livro-item';
        bookItem.innerHTML = `
            <h3>${livro.titulo} (${livro.ano})</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Gênero:</strong> ${livro.genero}</p>
            <p><strong>Avaliação:</strong> ${livro.rating} estrelas</p>
            <button onclick="avaliarLivro(${index})">Avaliar</button>
            <button onclick="deleteBook(${index})">Excluir</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Função para avaliar um livro
function avaliarLivro(index) {
    const rating = prompt("Dê uma nota de 1 a 5 para o livro:");
    if (rating >= 1 && rating <= 5) {
        catalogo[index].rating = rating;
        salvaCatalogo();
        displaycatalogo();
    } else {
        alert("Por favor, insira um número entre 1 e 5.");
    }
}

// Função para excluir um livro
function deleteBook(index) {
    catalogo.splice(index, 1);
    salvaCatalogo();
    displaycatalogo();
}

// Função para buscar livros
function buscarCatalogo() {
    const query = document.getElementById('buscarL').value.toLowerCase();

    // Filtra os livros pelo título, autor ou gênero
    const filtrarCatalogo = catalogo.filter(livro => 
        livro.titulo.toLowerCase().includes(query) ||
        livro.autor.toLowerCase().includes(query) ||
        livro.genero.toLowerCase().includes(query)
    );

    displaycatalogo(filtrarCatalogo); // Exibe os livros filtrados
}

// Carrega os livros quando a página é carregada
window.onload = function () {
    loadCatalogo();

    // Evento de clique para adicionar livros
    document.getElementById('addLivroButton').addEventListener('click', addlivro);

    // Evento de clique para buscar livros
    document.getElementById('buscarButton').addEventListener('click', buscarCatalogo);
};
