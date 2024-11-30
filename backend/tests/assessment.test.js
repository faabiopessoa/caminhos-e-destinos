import Assessment from '../models/Assessment';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('caminhos_e_destinos', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
});

describe('Assessment Model Test', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('Criando uma avaliação no banco de dados', async () => {
        const assessmentData = {
            name: 'Avaliação de Produto Teste',
            message: 'TESTANDO Este produto é excelente',
            stars: 5,
        };

        const assessment = await Assessment.create(assessmentData);

        expect(assessment).toHaveProperty('id');
        expect(assessment.name).toBe(assessmentData.name);
        expect(assessment.message).toBe(assessmentData.message);
        expect(assessment.stars).toBe(assessmentData.stars);
    });
});