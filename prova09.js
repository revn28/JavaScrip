const inputElement = document.getElementById("entrada0");
const lembreteElement = document.getElementById("lembrete");
const botaoAdicionar = document.getElementById("bnt0");

let tarefaAtual = null; 
let lembreteDefinido = false; 


inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        processarNota();
    }
});


botaoAdicionar.addEventListener("click", processarNota);

function processarNota() {
    const nota = inputElement.value;

    if (nota === "") {
        alert("Por favor, insira uma mensagem.");
        return;
    }

    if (!lembreteDefinido) {
       
        const desejaLembrete = confirm("Deseja adicionar um lembrete para esta nota?");
    
        if (desejaLembrete) {
        
            lembreteElement.style.display = "block";
            lembreteElement.focus();
            tarefaAtual = nota; 
            lembreteDefinido = true; 
        } else {
            adicionarTarefaComLimite24Horas(nota);
        }
    } else {
       
        const lembrete = lembreteElement.value;

        if (lembrete === "") {
            alert("Por favor, defina uma data e hora para o lembrete.");
            return;
        }

        lembreteElement.style.display = "none";
        adicionarNotaComLembrete(tarefaAtual, lembrete);
        lembreteDefinido = false; 
        inputElement.value = "";
    }

    
}


function adicionarNotaComLembrete(nota, lembrete) {
    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);
    const horaFormatada = formatarHoraSemSegundos(dataAtual);

    const listaTarefas = document.getElementById("boxtarefas");
    const novaTarefa = document.createElement("li");
    novaTarefa.innerHTML = `
        ${nota} <span>(Adicionada em: ${dataFormatada} às ${horaFormatada}) - Lembrete: ${formatarDataHora(new Date(lembrete))}</span>
        <button class="btn-concluir">Concluir</button>
        <button class="btn-excluir">Excluir</button>
    `;

    
    novaTarefa.querySelector(".btn-concluir").addEventListener("click", function() {
        marcarComoConcluida(novaTarefa);
    });

    
    novaTarefa.querySelector(".btn-excluir").addEventListener("click", function() {
        excluirTarefa(novaTarefa);
    });

    listaTarefas.appendChild(novaTarefa);

    
    verificarLembrete(nota, new Date(lembrete));
}


function adicionarTarefaComLimite24Horas(nota) {
    const dataAtual = new Date();
    const dataFormatada = formatarData(dataAtual);
    const horaFormatada = formatarHoraSemSegundos(dataAtual);

    const listaTarefas = document.getElementById("boxtarefas");
    const novaTarefa = document.createElement("li");
    novaTarefa.innerHTML = `
        ${nota} <span>(Adicionada em: ${dataFormatada} às ${horaFormatada}) - Lembrete: Voce tem 24 horas</span>
        <button class="btn-concluir">Concluir</button>
        <button class="btn-excluir">Excluir</button>
    `;


    novaTarefa.querySelector(".btn-concluir").addEventListener("click", function() {
        marcarComoConcluida(novaTarefa);
    });

    
    novaTarefa.querySelector(".btn-excluir").addEventListener("click", function() {
        excluirTarefa(novaTarefa);
    });

    listaTarefas.appendChild(novaTarefa);

    
    verificarLembrete24Horas(nota, dataAtual);
}


function verificarLembrete(nota, lembreteData) {
    const agora = new Date();
    const tempoRestante = lembreteData - agora;

    if (tempoRestante > 0) {
        setTimeout(function() {
            alert(`Lembrete: Hora de fazer a nota - ${nota}`);
        }, tempoRestante);
    }
}


function verificarLembrete24Horas(nota, dataAdicionada) {
   
    const lembreteData = new Date(dataAdicionada.getTime() + 24 * 60 * 60 * 1000); // Adiciona 24 horas
    const agora = new Date();
    const tempoRestante = lembreteData - agora;

    if (tempoRestante > 0) {
        setTimeout(function() {
            alert(`Lembrete: O prazo de 24 horas para a nota - ${nota} terminou.`);
        }, tempoRestante);
    }
}

// Função para marcar a nota como concluída
function marcarComoConcluida(notaElement) {
    notaElement.classList.toggle("nota-concluida");
}

// Função para excluir a nota
function excluirTarefa(notaElement) {
    notaElement.remove();
}

// Funções auxiliares para formatar data e hora
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function formatarHoraSemSegundos(data) {
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}

function formatarDataHora(data) {
    return `${formatarData(data)} às ${formatarHoraSemSegundos(data)}`;
}
