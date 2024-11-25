import jwt from 'jsonwebtoken';

const SECRET_KEY = 'web';

const token = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export default token;
