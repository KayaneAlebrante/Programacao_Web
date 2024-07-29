import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

export { database };

dotenv.config();

const database = {}

database.con = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

database.getMembrosEjs = async () => {
    let [rows, fields] = await database.con.execute('SELECT * FROM membros');
    return rows;
}

database.getMembroEj = async (id) => {
    let [rows] = await database.con.execute('SELECT * FROM membros WHERE id = ?', [id]);
    return rows;
}


database.insertMembroEj = async (membros) => {
    let { nome, email, data_filiacao, ativo } = membros;
    let [data] = await database.con.execute('INSERT INTO membros (nome, email, data_filiacao, ativo) VALUES (?, ?, ?, ?)', [nome, email, data_filiacao, ativo]);
    return data.insertId;
}

database.updateMembros = async (membros) => {
    let { id, nome, email, data_filiacao, ativo } = membros;
    let [data] = await database.con.execute('UPDATE membros SET nome = ?, email = ?,  data_filiacao = ?, ativo = ? WHERE id = ?', [nome, email, data_filiacao, ativo, id]);
    return data.affectedRows;
}

database.removeMembros = async (id) => {
    let [data] = await database.con.execute('DELETE FROM membros WHERE id = ?', [id]);
    return data.affectedRows;
}

