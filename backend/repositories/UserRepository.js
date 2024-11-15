import User from '../models/User.js';

const UserRepository = {
    create: async (nome, email, password) => {
        return await User.create({ nome, email, password });
    },

    findAll: async () => {
        return await User.findAll();
    },

    findById: async (id) => {
        return await User.findByPk(id);
    },
    
    findByEmail: async (email) => {
        return await User.findOne({ where: { email } });
    },

    update: async (id, nome, email, password) => {
        const user = await User.findByPk(id); 
        if (user) {
            user.nome = nome;
            user.email = email;
            user.password = password;
            await user.save();
        }
        return user;
    },

    delete: async (id) => {
        const user = await User.findByPk(id); 
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    },
};

export default UserRepository;