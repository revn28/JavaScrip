function converter() {
    const valor = parseFloat(document.getElementById('inputValue').value);
    const opcoes1 = document.getElementById('opcoes1').value;
    const opcoes2 = document.getElementById('opcoes2').value;

    if (isNaN(valor)) {
        document.getElementById('resultado').innerText = 'Por favor, insira um valor válido.';
        return;
    }

    let valorConvertido;

    // Conversões para metros (base para todas as outras conversões)
    let valorEmMetros;
    switch (opcoes1) {
        case 'metros':
            valorEmMetros = valor;
            break;
        case 'quilometros':
            valorEmMetros = valor * 1000;  
            break;
        case 'milhas':
            valorEmMetros = valor * 1609.34;  
            break;
        case 'jardas':
            valorEmMetros = valor / 1.09361;  
            break;
        case 'pes':
            valorEmMetros = valor / 3.28084;  
            break;
        case 'polegadas':
            valorEmMetros = valor / 39.3701;  
            break;
        default:
            valorEmMetros = valor;
    }

    // Conversões de metros para a unidade desejada
    switch (opcoes2) {
        case 'metros':
            valorConvertido = valorEmMetros;
            break;
        case 'quilometros':
            valorConvertido = valorEmMetros / 1000; 
            break;
        case 'milhas':
            valorConvertido = valorEmMetros / 1609.34;  
            break;
        case 'jardas':
            valorConvertido = valorEmMetros * 1.09361;  
            break;
        case 'pes':
            valorConvertido = valorEmMetros * 3.28084;  
            break;
        case 'polegadas':
            valorConvertido = valorEmMetros * 39.3701; 
            break;
        default:
            valorConvertido = valorEmMetros;
    }

    document.getElementById('resultado').innerText = `Resultado: ${valorConvertido.toFixed(7)}`;
}
