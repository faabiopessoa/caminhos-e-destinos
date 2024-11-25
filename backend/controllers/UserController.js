import userService from '../services/UserService.js';

const userController = {
    create: async (req, res) => {
        const { nome, email, password } = req.body;
        const newUser = await userService.create(nome, email, password);
        res.status(201).json(newUser);
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const { user, token } = await userService.authenticate(email, password);
            res.json({ 
                message: 'Login bem-sucedido', 
                user: { id: user.id, email: user.email }, 
                token 
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
    

    findAll: async (req, res) => {
        const users = await userService.findAll();
        res.json(users);
    },

    findById: async (req, res) => {
        const user = await userService.findById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    },

    update: async (req, res) => {
        const { nome, email, password } = req.body;
        const user = await userService.update(parseInt(req.params.id), nome, email, password);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(user);
    },

    delete: async (req, res) => {
        const deleted = await userService.delete(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).send();
    },
};

export default userController;