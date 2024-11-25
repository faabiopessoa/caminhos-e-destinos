import express from 'express';
import userController from './controllers/UserController.js';
import AssessmentController from './controllers/AssessmentController.js';
import touristSpotController from './controllers/TouristSpotController.js';
import sequelize from './configs/db.js';
import cors from 'cors';
import authMiddleware from './configs/token.js';


import session from 'express-session';
import passport from 'passport';
import './configs/auth.js';
import authRoutes from './configs/auth.js'


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// JWT
app.use(session({
    secret: 'seu_segredo',
    resave: false,
    saveUninitialized: true,
}));

//OAUTH 2
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes); 


//USERS
app.post('/users', userController.create);
app.post('/login', userController.login);
app.get('/users', authMiddleware, userController.findAll);
app.get('/users/:id', authMiddleware, userController.findById);
app.put('/users/:id', authMiddleware, userController.update);
app.delete('/users/:id', authMiddleware, userController.delete);

//ASSESSMENTS
app.post('/assessments', AssessmentController.create);
app.get('/assessments', AssessmentController.getAll);
app.get('/assessments/:id', AssessmentController.getById);
app.put('/assessments/:id', AssessmentController.update);
app.delete('/assessments/:id', AssessmentController.delete);

// TOURIST SPOTS
app.post('/tourist-spots', touristSpotController.create);
app.get('/tourist-spots', touristSpotController.findAll);
app.get('/tourist-spots/:id', touristSpotController.findById);
app.put('/tourist-spots/:id', touristSpotController.update);
app.delete('/tourist-spots/:id', touristSpotController.delete);


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