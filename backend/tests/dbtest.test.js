const { Sequelize } = require('sequelize');  

const sequelize = new Sequelize('caminhos_e_destinos', 'root', '123456789', {
  host: 'localhost',
  dialect: 'mysql',
});

describe('Conexão com Database', () => {
  test('Conexão ao banco de dados com sucesso', async () => {
    await expect(sequelize.authenticate()).resolves.toBeUndefined();
  });
});
