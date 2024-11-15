import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('caminhos_e_destinos', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;