import express from 'express';
import userController from './controllers/UserController.js';
import AssessmentController from './controllers/AssessmentController.js';
import sequelize from './configs/db.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/users', userController.create);
app.get('/users', userController.findAll);
app.post('/login', userController.login);
app.get('/users/:id', userController.findById);
app.put('/users/:id', userController.update);
app.delete('/users/:id', userController.delete);

app.post('/assessments', AssessmentController.create);
app.get('/assessments', AssessmentController.getAll);
app.get('/assessments/:id', AssessmentController.getById);
app.put('/assessments/:id', AssessmentController.update);
app.delete('/assessments/:id', AssessmentController.delete);


const start = async () => {
    try {
        await sequelize.sync(); 

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

start();