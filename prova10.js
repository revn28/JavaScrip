let tarefas = [{'tarefa': false}];
let ok = true;

// Elementos do DOM
const novaTarefaInput = document.getElementById('nova-tarefa');
const adicionarTarefaBtn = document.getElementById('adicionar-tarefa');
const listaTarefasDiv = document.getElementById('lista-tarefas');

// Função para exibir as tarefas
function exibirTarefas() {
    listaTarefasDiv.innerHTML = ''; // Limpa a lista de tarefas

    tarefas.forEach((tarefa, index) => {
        if (tarefa.tarefa !== false) {
            const tarefaDiv = document.createElement('div');
            tarefaDiv.classList.add('tarefa');
            if (tarefa.concluida) {
                tarefaDiv.classList.add('concluida');
            }

            // Checkbox para concluir a tarefa
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarefa.concluida; // Marcar se já foi concluída
            checkbox.addEventListener('change', () => {
                tarefas[index].concluida = checkbox.checked;
                exibirTarefas();
            });

            const spanTarefa = document.createElement('span');
            spanTarefa.textContent = tarefa.tarefa;

            const btnAtualizar = document.createElement('button');
            btnAtualizar.textContent = 'Atualizar';
            btnAtualizar.addEventListener('click', () => {
                const novaTarefa = prompt('Atualizar tarefa:', tarefa.tarefa);
                if (novaTarefa) {
                    tarefas[index].tarefa = novaTarefa;
                    tarefas[index].concluida = false;
                    exibirTarefas();
                }
            });

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.addEventListener('click', () => {
                tarefas.splice(index, 1);
                exibirTarefas();
            });

            tarefaDiv.appendChild(checkbox);  // Adiciona o checkbox
            tarefaDiv.appendChild(spanTarefa);
            tarefaDiv.appendChild(btnAtualizar);
            tarefaDiv.appendChild(btnRemover);

            listaTarefasDiv.appendChild(tarefaDiv);
        }
    });
}

// Adiciona tarefa
adicionarTarefaBtn.addEventListener('click', () => {
    const tarefaTexto = novaTarefaInput.value.trim();

    if (tarefaTexto) {
        tarefas.push({ tarefa: tarefaTexto, concluida: false });
        novaTarefaInput.value = ''; // Limpa o campo de texto
        exibirTarefas();
    }
});

// Inicializa a exibição das tarefas
exibirTarefas();
