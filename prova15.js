
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const tabelaContatos = document.querySelector("#tabela-contatos tbody");
const botaoAdicionar = document.getElementById("adicionar");

let contatos = []; 
let contatoEditando = null; 


function adicionarContato() {
    const nome = nomeInput.value;
    const email = emailInput.value;
    const tel = telInput.value;

    if (nome === "" || email === "" || tel === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    
    if (contatoEditando !== null) {
        contatos[contatoEditando] = { nome, email, tel };
        contatoEditando = null;
        botaoAdicionar.textContent = "Adicionar Contato";
    } else {
        
        contatos.push({ nome, email, tel });
    }

    
    atualizarListaDeContatos();

    
    limparFormulario();
}

// Função para limpar o formulário
function limparFormulario() {
    nomeInput.value = "";
    emailInput.value = "";
    telInput.value = "";
}

// Função para atualizar a tabela com a lista de contatos
function atualizarListaDeContatos() {
    
    tabelaContatos.innerHTML = "";

    
    contatos.forEach((contato, index) => {
        const linha = document.createElement("tr");

        const celulaNome = document.createElement("td");
        celulaNome.textContent = contato.nome;

        const celulaEmail = document.createElement("td");
        celulaEmail.textContent = contato.email;

        const celulaTel = document.createElement("td");
        celulaTel.textContent = contato.tel;

        
        const celulaAcoes = document.createElement("td");

        
        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "editar";
        botaoEditar.onclick = () => editarContato(index);

        
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => excluirContato(index);

        
        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);

        
        linha.appendChild(celulaNome);
        linha.appendChild(celulaEmail);
        linha.appendChild(celulaTel);
        linha.appendChild(celulaAcoes);

        
        tabelaContatos.appendChild(linha);
    });
}


function editarContato(index) {
    const contato = contatos[index];

    
    nomeInput.value = contato.nome;
    emailInput.value = contato.email;
    telInput.value = contato.tel;

    
    botaoAdicionar.textContent = "Salvar";

    
    contatoEditando = index;
}


function excluirContato(index) {
    contatos.splice(index, 1); 
    atualizarListaDeContatos(); 
}


botaoAdicionar.addEventListener("click", adicionarContato);
