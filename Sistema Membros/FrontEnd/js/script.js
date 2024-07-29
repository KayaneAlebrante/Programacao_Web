
document.querySelector('#autenticar').addEventListener('click', autenticar);
document.getElementById('salvar').addEventListener('click', adicionarMembro);

async function autenticar() {
    try {
        let email = 'teste@gmail.com';
        let senha = '123456';

        let resposta = await fetch('http://localhost:5001/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                senha: senha
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (resposta.ok) {
            let dados = await resposta.json();

            if (dados.token) {
                localStorage.setItem('token', dados.token);
                console.log('Autenticação bem-sucedida');

                loadCadastros();
            } else {
                console.error('Token ausente na resposta');
            }
        } else {
            console.error('Falha na autenticação');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }
}

async function adicionarMembro(event) {
    event.preventDefault();

    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const dataFiliacao = document.getElementById('cad-dataFiliacao').value;
    const ativo = true;
    const tbodyMembro = document.getElementById('tbodyMembros');

    if (!nome || !email || !dataFiliacao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        let header = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                data_filiacao: dataFiliacao,
                ativo: ativo
            })
        };

        let resposta = await fetch('http://localhost:5001/membros', header);
        resposta = await resposta.json();
        console.log('Resposta', resposta);

        if (resposta.success) {
            alert("Erro ao salvar!");
        } else {
            alert("Salvo com sucesso!");
            document.getElementById('cadastro').reset();
            loadCadastros();
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function insertCadastros(getMembroEj, index) {
    let tbodyMembro = document.getElementById('tbodyMembros');
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${getMembroEj.id}</td>
        <td>${getMembroEj.nome}</td>
        <td>${getMembroEj.email}</td>
        <td>${getMembroEj.dataFiliacao}</td>
        <td class="acao"><button id="editar" onclick="editarMembro(${getMembroEj.id})"><img src="img/editar.png"></button></td>
        <td class="acao"><button id="excluir" onclick="excluirMembro(${getMembroEj.id})"><img src="img/excluir.png"></button></td>
    `;

    tbodyMembro.appendChild(tr);
}

function insertCadastros(getMembroEj, index) {
    let tbodyMembro = document.getElementById('tbodyMembros');      
    let tr = document.createElement('tr');   
    
    DataFormat= formatarData(getMembroEj.data_filiacao);
   
    tr.innerHTML = `
            <td>${getMembroEj.id}</td>
            <td>${getMembroEj.nome}</td>
            <td>${getMembroEj.email}</td>
            <td>${DataFormat}</td>
            <td class="acao"><button id="editar" onclick="editarMembro(${getMembroEj.id})"><img src="img/editar.png"></button></td>
            <td class="acao"><button id="excluir" onclick="excluirMembro(${getMembroEj.id})"><img src="img/excluir.png"></button></td>
    `;
    
    tbodyMembro.appendChild(tr);    
}

function formatarData(data_filiacao) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formatador = new Intl.DateTimeFormat('pt-BR', options);
    const dataFormatada = formatador.format(new Date(data_filiacao));
    return dataFormatada;
}

async function loadCadastros() {
    try {
        let header = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        let resposta = await fetch('http://localhost:5001/membros', header);
        let membros = await resposta.json();
        console.log(membros);

        let tbodyMembro = document.getElementById('tbodyMembros');
        tbodyMembro.innerHTML = '';

        membros.forEach((item, index) => {
            insertCadastros(item, index);
        });
    } catch (error) {
        console.error('Erro ao carregar cadastros:', error);
    }
}

loadCadastros();

async function editarMembro(id) {
    try {
        let header = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };
        let resposta = await fetch('http://localhost:5001/membros/' + id, header);
        let membros = await resposta.json();
        console.log(membros);
        
        membros.forEach((item, index) => {
            document.getElementById('cad-nome').value = item["nome"];
            document.getElementById('cad-email').value = item["email"];
            
            let dataFiliacao = new Date(item["data_filiacao"]);
            let dataFormatada = dataFiliacao.toISOString().split('T')[0];
            document.getElementById('cad-dataFiliacao').value = dataFormatada;            

            document.getElementById('salvar').removeEventListener('click', adicionarMembro);
            document.getElementById('salvar').addEventListener('click', () => salvarMembro(id));

        });
    } catch (error) {
        console.error('Erro ao popular campos:', error);
    }
}

async function salvarMembro(id){
    const novoNome = document.getElementById('cad-nome').value;
    const novoEmail = document.getElementById('cad-email').value;
    const novaDataFiliacao = document.getElementById('cad-dataFiliacao').value;
    const ativo = true;

    try {
        let header = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nome: novoNome,
                email: novoEmail,
                data_filiacao: novaDataFiliacao,
                ativo: ativo
            })
        };

        let resposta = await fetch('http://localhost:5001/membros/' + id, header);
        resposta = await resposta.json();
        return await resposta.json(), window.location.reload();

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

async function excluirMembro(id){
    let header = {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    
        let confim = confirm("Quer mesmo apagar esse membro?");
        if(confim){
            try{
                let resposta = await fetch('http://localhost:5001/membros/' + id, header);
                return await resposta.json(), window.location.reload();

            }catch(error){
                console.log(error);
            }
        }
}