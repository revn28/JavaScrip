// Função para salvar os usuários no localStorage
try{
    function salvar_usuario() {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}catch(e){
    console.log('salvar usuario',e);
}

// Função para carregar os usuários do localStorage
try{
    function carregar_usuario() {
        const usuariosSalvos = localStorage.getItem('usuarios');
        if (usuariosSalvos) {
            return JSON.parse(usuariosSalvos);
        }
        return {};
    }
}catch(e){
    console.log('carregar usuario',e)
}

// Carregar os usuários já cadastrados
const usuarios = carregar_usuario();
let usuario_logado = null;  // Variável para armazenar o usuário logado

// Pegando os elementos do HTML
const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const btn_entrar = document.querySelector("input[value='Entrar']");

// Elementos da página de cadastro
const c_nome = document.getElementById("c_nome");
const c_data_nascimento = document.getElementById("c_data_nascimento");
const c_tel = document.getElementById("c_tel");
const c_email = document.getElementById("c_email");
const c_usuario = document.getElementById("c_usuario");
const c_senha = document.getElementById("c_senha");
const c_valor_inicial = document.getElementById("c_valor_inicial");
const btn_cadastrar = document.getElementById("btn_c");

// Função para verificar se o e-mail já está cadastrado
try{    
    function email_ja_cadastrado(email) {
        return Object.values(usuarios).some(user => user.email === email);
    }
}catch(e){
    console.log('email cadastrado',e)
}      

// Função para cadastrar o usuário
try{

    if (btn_cadastrar) {
        btn_cadastrar.addEventListener("click", function () {
            const novoUsuario = {
                nome: c_nome.value,
                dataNascimento: c_data_nascimento.value,
                telefone: c_tel.value,
                email: c_email.value,
                senha: c_senha.value,
                saldo: parseFloat(c_valor_inicial.value),  // Armazena o valor inicial da conta
            };
            
            // Verifica se o usuário ou e-mail já existe
            if (usuarios[c_usuario.value]) {
                alert("Usuário já existe! Escolha outro nome de usuário.");
            } else if (email_ja_cadastrado(c_email.value)) {
                alert("Este e-mail já está cadastrado! Use outro e-mail.");
            } else if (c_usuario.value && c_senha.value && c_valor_inicial.value && c_email.value) {
                // Adicionando o novo usuário ao objeto "usuarios"
                usuarios[c_usuario.value] = novoUsuario;
                salvar_usuario(); // Salvar no localStorage
                alert("Usuário cadastrado com sucesso! Saldo inicial: R$ " + c_valor_inicial.value);
                limpar_campos_cadastro(); // Função para limpar os campos após o cadastro
            } else {
                alert("Por favor, preencha todos os campos!");
            }
        });
    }
}catch(e){
    console.log('btn cadastrar',e);
}

// Função para limpar os campos de cadastro
try {
    function limpar_campos_cadastro() {
        c_nome.value = "";
        c_data_nascimento.value = "";
        c_tel.value = "";
        c_email.value = "";
        c_usuario.value = "";
        c_senha.value = "";
        c_valor_inicial.value = "";
    }
}catch(e){
    console.log("limpa campos",e);
}


// Função para validar o login
try {
    if (btn_entrar) {
        btn_entrar.addEventListener("click", function () {
            const usuarioInput = usuario.value;
            const senhaInput = senha.value;
            
            if (usuarios[usuarioInput] && usuarios[usuarioInput].senha === senhaInput) {
                usuario_logado = usuarios[usuarioInput];  // Armazena o usuário logado
                criar_area_bancaria();  // Cria a interface bancária na mesma página
                // Redirecionar para outra página ou mostrar conteúdo restrito
            } else {
                alert("Usuário ou senha incorretos!");
            }
        });
    }
}catch(e){
    console.log('btn_entrar',e);
};
    
// Função para criar a área bancária após login bem-sucedido
try {
    function criar_area_bancaria() {
        // Esconder o formulário de login
        document.getElementById("conteiner1").style.display = "none";
        
        // Criar a área bancária dentro do 'area-bancaria'
        const areaBancaria = document.getElementById("area-bancaria");
        
        // Exibe o nome do usuário e saldo
        const usuarioLogadoTexto = document.createElement("p");
        usuarioLogadoTexto.innerText = `Bem-vindo, ${usuario.value}!`;
        
        const saldoTexto = document.createElement("p");
        saldoTexto.innerHTML = `Saldo atual: R$ <span id="saldo">${usuario_logado.saldo.toFixed(2)}</span>`;
        
        // Formulário de depósito
        const formDeposito = document.createElement("div");
        formDeposito.innerHTML = `
        <h3>Depositar</h3>
        Valor: <input type="number" id="valor-deposito" placeholder="Ex: 500.00">
        <input type="button" value="Depositar" id="btn-depositar">
        `;
        
        // Formulário de saque
        const formSaque = document.createElement("div");
        formSaque.innerHTML = `
        <h3>Sacar</h3>
        Valor: <input type="number" id="valor-saque" placeholder="Ex: 200.00">
        <input type="button" value="Sacar" id="btn-sacar">
        `;
        
        // Botão de sair
        const btnSair = document.createElement("input");
        btnSair.type = "button";
        btnSair.value = "Sair";
        btnSair.id = "btn-sair";
        btnSair.style.marginTop = "20px";  // Estilizando o botão com um espaçamento
        
        // Mensagem de sucesso ou erro nas operações
        const mensagemTexto = document.createElement("p");
        mensagemTexto.id = "mensagem";
        
        // Adiciona tudo ao 'area-bancaria'
        areaBancaria.appendChild(usuarioLogadoTexto);
        areaBancaria.appendChild(saldoTexto);
        areaBancaria.appendChild(formDeposito);
        areaBancaria.appendChild(formSaque);
        areaBancaria.appendChild(mensagemTexto);
        areaBancaria.appendChild(btnSair);
        
        // Eventos para os botões de depósito e saque
        document.getElementById('btn-depositar').addEventListener('click', depositar_valor);
        document.getElementById('btn-sacar').addEventListener('click', sacar_valor);
        document.getElementById('btn-sair').addEventListener('click', sair_da_conta);
    }
}catch(e){
    console.log('area bancaria',e);
}
    
// Função para depósito
try {
    function depositar_valor() {
        const valorDeposito = parseFloat(document.getElementById('valor-deposito').value);
        if (valorDeposito > 0) {
            usuario_logado.saldo += valorDeposito;
            salvar_usuario();  // Salvar os dados atualizados no localStorage
            document.getElementById('saldo').innerText = usuario_logado.saldo.toFixed(2);
            document.getElementById('mensagem').innerText = `Depósito de R$ ${valorDeposito.toFixed(2)} realizado com sucesso!`;
            document.getElementById('valor-deposito').value = '';  // Limpar o campo de depósito
        } else {
            alert("Insira um valor válido para depósito.");
        }
    }
}catch(e){
    console.log('depositar valor',e);
}
    
// Função para saque
try {

    function sacar_valor() {
        const valorSaque = parseFloat(document.getElementById('valor-saque').value);
        if (valorSaque > 0 && valorSaque <= usuario_logado.saldo) {
            usuario_logado.saldo -= valorSaque;
            salvar_usuario();  // Salvar os dados atualizados no localStorage
            document.getElementById('saldo').innerText = usuario_logado.saldo.toFixed(2);
            document.getElementById('mensagem').innerText = `Saque de R$ ${valorSaque.toFixed(2)} realizado com sucesso!`;
            document.getElementById('valor-saque').value = '';  // Limpar o campo de saque
        } else if (valorSaque > usuario_logado.saldo) {
            alert("Saldo insuficiente.");
        } else {
            alert("Insira um valor válido para saque.");
        }
    }
}catch(e){
    console.log('sacar valor',e);
}

// Função para sair da conta
try {
    function sair_da_conta() {
    // Limpa os dados do usuário logado
    usuario_logado = null;
    
    // Exibe novamente o formulário de login
    document.getElementById("conteiner1").style.display = "block";
    
    // Limpa a área bancária
    const areaBancaria = document.getElementById("area-bancaria");
    areaBancaria.innerHTML = '';
    
    // Limpar os campos de login
    usuario.value = '';
    senha.value = '';
}}catch(e){
    console.log('sair conta',e);
}