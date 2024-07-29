class Imovel {
    constructor(endereco, titulo, caracteristicas, imagem, preco) {
        this.endereco = endereco;
        this.titulo = titulo;
        this.caracteristicas = caracteristicas;
        this.preco = preco;
        this.imagem = imagem;
    }
}

class Casa extends Imovel {
    constructor(endereco, titulo, caracteristicas, imagem, preco, areaConstruida, areaTerreno) {
        super(endereco, titulo, caracteristicas, imagem, preco);
        this.areaConstruida = areaConstruida;
        this.areaTerreno = areaTerreno;
    }
}

class Apartamento extends Imovel {
    constructor(endereco, titulo, caracteristicas, imagem, preco, condominio, metragem) {
        super(endereco, titulo, caracteristicas, imagem, preco);
        this.condominio = condominio;
        this.metragem = metragem;
    }
}


document.getElementById('salvarCs').addEventListener('click', function (event) {
    adicionarCasa(event);
});


function adicionarCasa(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const endereco = document.getElementById('endereco').value;
    const caracteristicas = document.getElementById('caracteristicas').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;
    const areaConstruida = parseFloat(document.getElementById('areac').value);
    const areaTerreno = parseFloat(document.getElementById('areat').value);

    const novaCasa = new Casa(endereco, titulo, caracteristicas, imagem, preco, areaConstruida, areaTerreno);

    const card = document.createElement('div');
    card.classList.add('card');

    const imagemCasa = document.createElement('img');
    imagemCasa.src = novaCasa.imagem;
    imagemCasa.className = 'imgCard';
    card.appendChild(imagemCasa);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('cardInfo');
    card.appendChild(cardInfo);

    const tituloCasa = document.createElement('h3');
    tituloCasa.textContent = novaCasa.titulo;
    cardInfo.appendChild(tituloCasa);

    const enderecoCasa = document.createElement('p');
    enderecoCasa.textContent = novaCasa.endereco;
    cardInfo.appendChild(enderecoCasa);

    const caracteristicasCasa = document.createElement('p');
    caracteristicasCasa.textContent = novaCasa.caracteristicas;
    cardInfo.appendChild(caracteristicasCasa);

    const precoCasa = document.createElement('h4');
    precoCasa.textContent = `R$ ${novaCasa.preco}`;
    cardInfo.appendChild(precoCasa);

    const areaTerrenoCasa = document.createElement('p');
    areaTerrenoCasa.textContent = `Área de Terreno: ${novaCasa.areaTerreno} m²`;
    cardInfo.appendChild(areaTerrenoCasa);

    const areaConstruidaCasa = document.createElement('p');
    areaConstruidaCasa.textContent = `Área Construída: ${novaCasa.areaConstruida} m²`;
    cardInfo.appendChild(areaConstruidaCasa);

    const botãoEditar = document.createElement('button');
    botãoEditar.textContent = 'Editar';
    botãoEditar.className = 'editar';
    botãoEditar.addEventListener('click', editarCasa);
    cardInfo.appendChild(botãoEditar);

    const botãoExcluir = document.createElement('button');
    botãoExcluir.textContent = 'Excluir';
    botãoEditar.className = 'excluir';
    botãoExcluir.addEventListener('click', excluir);
    cardInfo.appendChild(botãoExcluir);

    const imovelCard = document.querySelector('#imoveis');
    imovelCard.appendChild(card);

    document.getElementById('casa').reset();

    let imoveis = [];
    if (localStorage.hasOwnProperty("imoveis")) {
        imoveis = JSON.parse(localStorage.getItem("imoveis"));
    }

    imoveis.push({ titulo, endereco, caracteristicas, preco, imagem, areaTerreno, areaConstruida });

    localStorage.setItem("imoveis", JSON.stringify(imoveis));
}

document.getElementById('salvarAp').addEventListener('click', function (event) {
    adicionarApartamento(event);
});

function adicionarApartamento(event) {
    event.preventDefault();

    const titulo = document.getElementById('tituloAp').value;
    const endereco = document.getElementById('enderecoAp').value;
    const caracteristicas = document.getElementById('caracteristicas').value;
    const preco = parseFloat(document.getElementById('precoAp').value);
    const imagem = document.getElementById('imagemAp').value;
    const metragem = parseFloat(document.getElementById('metragemAp').value);
    const condominio = parseFloat(document.getElementById('condominioAp').value);

    const novoApartamento = new Apartamento(endereco, titulo, caracteristicas, imagem, preco, condominio, metragem);

    const card = document.createElement('div');
    card.classList.add('card');

    const imagemAp = document.createElement('img');
    imagemAp.src = novoApartamento.imagem;
    imagemAp.classList.add('imgCard');
    card.appendChild(imagemAp);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('cardInfo');
    card.appendChild(cardInfo);

    const tituloAp = document.createElement('h3');
    tituloAp.textContent = novoApartamento.titulo;
    tituloAp.classList.add('tituloAp');
    cardInfo.appendChild(tituloAp);

    const enderecoAp = document.createElement('p');
    enderecoAp.textContent = novoApartamento.endereco;
    enderecoAp.classList.add('enderecoAp');
    cardInfo.appendChild(enderecoAp);

    const caracteristicasAp = document.createElement('p');
    caracteristicasAp.textContent = novoApartamento.caracteristicas;
    caracteristicasAp.classList.add('caracteristicas');
    cardInfo.appendChild(caracteristicasAp);

    const precoAp = document.createElement('h4');
    precoAp.textContent = `R$ ${novoApartamento.preco}`;
    precoAp.classList.add('precoAp');
    cardInfo.appendChild(precoAp);

    const metragemAp = document.createElement('p');
    metragemAp.textContent = `Área de Terreno: ${novoApartamento.metragem} m²`;
    metragemAp.classList.add('metragemAp');
    cardInfo.appendChild(metragemAp);

    const condominioAp = document.createElement('p');
    condominioAp.textContent = `Área Construída: ${novoApartamento.condominio} m²`;
    condominioAp.classList.add('condominioAp');
    cardInfo.appendChild(condominioAp);

    const botãoEditar = document.createElement('button');
    botãoEditar.textContent = 'Editar';
    botãoEditar.className = 'editar';
    botãoEditar.addEventListener('click', editarAp);
    cardInfo.appendChild(botãoEditar);

    const botãoExcluir = document.createElement('button');
    botãoExcluir.textContent = 'Excluir';
    botãoEditar.className = 'excluir';
    botãoExcluir.addEventListener('click', excluir);
    cardInfo.appendChild(botãoExcluir);

    const imovelCard = document.querySelector('#imoveis');
    imovelCard.appendChild(card);

    document.getElementById('ap').reset();

    let imoveis = [];
    if (localStorage.hasOwnProperty("imoveis")) {
        imoveis = JSON.parse(localStorage.getItem("imoveis"));
    }

    imoveis.push({ titulo, endereco, caracteristicas, preco, imagem, metragem, condominio });

    localStorage.setItem("imoveis", JSON.stringify(imoveis));
}

function excluir(event) {
    const card = event.target.parentElement.parentElement;
    const imoveis = JSON.parse(localStorage.getItem("imoveis"));

    const titulo = card.querySelector('h3').textContent;
    const endereco = card.querySelector('p').textContent;

    const index = imoveis.findIndex(imovel => imovel.titulo === titulo && imovel.endereco === endereco);

    if (index !== -1) {
        imoveis.splice(index, 1);
        localStorage.setItem("imoveis", JSON.stringify(imoveis));
    }

    alert('O Imovel será deletado!');

    card.remove();
}


function editarCasa(event) {
    alert('Editar Imovel');
}

function editarAp(event) {
    alert('Editar Imovel');
}