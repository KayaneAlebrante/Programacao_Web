import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5501',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
