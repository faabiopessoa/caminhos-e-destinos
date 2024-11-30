import User from '../models/User';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('caminhos_e_destinos', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
  });

describe('User Model Test', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Criando um usuário no banco de dados', async () => {
    const userData = {
      email: 'testando@example.com',
      password: '123456789',
    };

    const user = await User.create(userData);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password);
  });

  /*test('Erro ao criar um usuário com email inválido', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'invalid-email', password: '12345678' });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/Validation/);
  });*/

});
