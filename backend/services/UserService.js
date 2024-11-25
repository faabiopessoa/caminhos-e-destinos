import userRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'web'; 

const userService = {
    create: async (nome, email, password) => await userRepository.create(nome, email, password),
    
    authenticate: async (email, password) => {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciais inválidas');
        }

        
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h', 
        });

        return { user, token };
    },

    findAll: async () => await userRepository.findAll(),
    findById: async (id) => await userRepository.findById(id),
    update: async (id, nome, email, password) => await userRepository.update(id, nome, email, password),
    delete: async (id) => await userRepository.delete(id),
};

export default userService;
