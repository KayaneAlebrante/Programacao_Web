import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).send({ auth: false, mensagem: 'Nenhum token informado' });

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ auth: false, mensagem: 'Token inválido', err });
        }

        req.email = decoded.email;
        next();
    });
}
