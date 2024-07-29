import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors'; // Importe o pacote cors
import { database } from './database.js';
import { autenticarToken } from './middleware.js';

dotenv.config();

const app = express();
const router = express.Router();

app.use(cors()); // Adicione o middleware cors
app.use(express.json());

router.get('/membros', autenticarToken, async (req, res) => {
    res.status(200).send(await database.getMembrosEjs());
});

router.get('/membros/:id', async (req, res) => {
    let id = req.params.id;
    res.status(200).send(await database.getMembroEj(id));
});

router.post('/membros', autenticarToken, async (req, res) => {
    let membros = req.body;
    let id = await database.insertMembroEj(membros);
    res.status(201).send({ mensagem: `membro criado com sucesso, id ${id}`, id: id });
});

router.put('/membros/:id', autenticarToken, async (req, res) => {
    const membros = req.body;
    const id = req.params.id;
    const result = await database.updateMembros({ ...membros, id });
    res.status(200).send({ mensagem: `Membro com ID ${id} atualizado com sucesso`, id });
});

router.delete('/membros/:id', autenticarToken, async (req, res) => {
    const id = req.params.id;
    const result = await database.removeMembros(id);
    res.status(200).send({ mensagem: `Membro com ID ${id} removido com sucesso`, id });
});

router.post('/login', async (req, res) => {
    let { email, senha } = req.body;

    if (email === 'admin@forcetechjr.com' && senha === '123456') {
        let token = jwt.sign({ email: email }, process.env.SECRET, { expiresIn: 600 });
        res.status(200).send({ auth: true, token: token });
    } else {
        res.status(401).send({ auth: false, mensagem: 'Usuário ou senha inválidos' });
    }
});

app.use('/api', router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

export default router;
