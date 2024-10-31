let listaSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 0;

exibirMensagemInicial();

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    let tamanhoLista = listaSorteados.length;

    if (tamanhoLista == numeroLimite) {
        listaSorteados = [];
    }

    if (listaSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaSorteados.push(numeroSorteado);
        console.log(listaSorteados);
        return numeroSorteado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    tentativas = 0;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas++;

    if (chute == numeroAleatorio) {
        exibirTexto('h1', 'Acertou!');
        let palavraTeentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTeentativa}!`;
        exibirTexto('p', msgTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroAleatorio) {
            exibirTexto('p', 'O número secreto é maior que ' + chute);
        } else {
            exibirTexto('p', 'O número secreto é menor que ' + chute);
        }
        limparCampo();
    }
}