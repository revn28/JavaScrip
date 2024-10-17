document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Verifica se o usuário está logado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser && welcomeMessage) {  // Verifica se o usuário está logado e o elemento existe
        welcomeMessage.textContent = `Bem-vindo, ${loggedInUser.email}`;
        if (loginButton) loginButton.style.display = 'none';
        if (registerButton) registerButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'inline';
    }

    // Redireciona para a página de login
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Redireciona para a página de registro
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            alert('Você foi desconectado.');
            window.location.reload();
        });
    }

    // Função de Registro de Usuários
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('emailRegister').value;
            const password = document.getElementById('passwordRegister').value;

            // Recupera usuários do localStorage (ou cria um array vazio)
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Verifica se o usuário já existe
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert('Este e-mail já está registrado. Tente fazer login.');
            } else {
                // Cria um novo usuário e adiciona à lista de usuários
                const newUser = { email, password };
                users.push(newUser);

                // Salva os usuários atualizados no localStorage
                localStorage.setItem('users', JSON.stringify(users));

                alert('Registro bem-sucedido! Você agora pode fazer login.');
                window.location.href = 'login.html'; // Redireciona para a página de login
            }
        });
    }

    // Função de Login de Usuários
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('emailLogin').value;
            const password = document.getElementById('passwordLogin').value;

            // Recupera os usuários do localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Verifica se o usuário existe e a senha está correta
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert('Login bem-sucedido!');

                // Armazena o usuário logado no localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(user));

                window.location.href = 'prova18.html'; // Redireciona para a página inicial
            } else {
                alert('Credenciais inválidas! Verifique o e-mail ou senha.');
            }
        });
    }

    // Declara a variável products no escopo global
    let products = []; // Inicializa a variável products

    // Função de Busca de Produtos
    const productsContainer = document.getElementById('productsContainer');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    if (productsContainer && searchButton && searchInput) {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                products = data; // Armazena os produtos na variável global
                exibirProdutos(products);

                searchButton.addEventListener('click', () => {
                    const searchTerm = searchInput.value.toLowerCase();
                    const produtosFiltrados = products.filter(produto => 
                        produto.title.toLowerCase().includes(searchTerm)
                    );
                    exibirProdutos(produtosFiltrados);
                });
            });

        function exibirProdutos(produtos) {
            productsContainer.innerHTML = produtos.map(produto => `
                <div class="produto">
                    <h3>${produto.title}</h3>
                    <img src="${produto.image}" alt="${produto.title}">
                    <p>Preço: $${produto.price.toFixed(2)}</p>
                    <button class="addToCart" data-id="${produto.id}">Adicionar ao Carrinho</button>
                </div>
            `).join('');
            
            document.querySelectorAll('.addToCart').forEach(button => {
                button.addEventListener('click', (e) => {
                    if (loggedInUser) {
                        adicionarAoCarrinho(e.target.dataset.id);
                    } else {
                        alert('Você precisa estar logado para adicionar itens ao carrinho.');
                    }
                });
            });
        }
    }

    function adicionarAoCarrinho(idProduto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        let produto = products.find(prod => prod.id == idProduto);
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert(`Produto ${produto.title} adicionado ao carrinho!`);
        atualizarCarrinho();
    }

    // Finalizar compra
    const finalizarCompraButton = document.getElementById('finalizarCompraButton');
    if (finalizarCompraButton) {
        finalizarCompraButton.addEventListener('click', () => {
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            if (carrinho.length > 0) {
                alert(`Compra finalizada! Total: $${totalCarrinho().toFixed(2)}`);
                localStorage.removeItem('carrinho');
                atualizarCarrinho();
            } else {
                alert('O carrinho está vazio.');
            }
        });
    }

    function atualizarCarrinho() {
        const carrinhoItems = document.getElementById('carrinhoItems');
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
        if (carrinhoItems) {
            if (carrinho.length > 0) {
                carrinhoItems.innerHTML = carrinho.map(prod => {
                    if (prod && prod.title && prod.price) { // Verifica se o produto é válido
                        return `<p>${prod.title} - $${prod.price.toFixed(2)}</p>`;
                    }
                    return ''; // Retorna uma string vazia se o produto não for válido
                }).join('');
            } else {
                carrinhoItems.innerHTML = '<p>Carrinho vazio</p>'; // Exibe mensagem se o carrinho estiver vazio
            }
            document.getElementById('total').textContent = `Total: $${totalCarrinho().toFixed(2)}`;
        }
    }
    
    // Função para calcular o total do carrinho
    function totalCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        return carrinho.reduce((total, prod) => {
            return total + (prod && prod.price ? prod.price : 0); // Verifica se o preço é válido
        }, 0);
    }
    

    atualizarCarrinho();
});
