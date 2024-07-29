document.querySelector('#enviar').addEventListener('click', adicionar);

function adicionar(event) {
    event.preventDefault();

    let form = document.querySelector('form');

    if (camposVazio(form)) {
        return;
    }

    let cartao = document.createElement('div');
    cartao.className = 'recado';

    let titulo = document.createElement('h4');
    let recado = document.createElement('p');

    titulo.textContent = form.titulo.value;
    recado.textContent = form.recado.value;

    cartao.appendChild(titulo);
    cartao.appendChild(recado);

    let botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.className = 'remover'

    botaoRemover.addEventListener('click', remover);

    let botaoEditar = document.createElement('button');
    botaoEditar.textContent = 'Editar';
    botaoEditar.className = 'editar'

    botaoEditar.addEventListener('click', editar);

    cartao.appendChild(botaoRemover);
    cartao.appendChild(botaoEditar);

    document.querySelector("#recados").appendChild(cartao);
    form.reset();
}

function camposVazio(form) {
    let verificaTituloVazio = form.titulo.value.trim();
    let verificaRecadoVazio = form.recado.value.trim();

    if (verificaTituloVazio === '' || verificaRecadoVazio === '') {
        alert('Preencha os campos requisitados');
        return true;
    }
}

function remover(event) {
    let cartao = event.target.parentElement;
    alert("O Recado será removido!");

    cartao.remove();
}

function editar(event) {
    let cartao = event.target.parentElement;
    let titulo = cartao.querySelector('h4').textContent;
    let recado = cartao.querySelector('p').textContent;

    let novoTitulo = prompt('Editar título do recado:', titulo);
    let novoRecado = prompt('Editar Recado: ', recado);

    if (novoTitulo && novoRecado !== '') {
        if (novoTitulo && novoRecado !== null) {
            cartao.querySelector('h4').textContent = novoTitulo;
            cartao.querySelector('p').textContent = novoRecado;
        }
    }
    else {
        alert("Preencha os campos para editar")
    }
}
