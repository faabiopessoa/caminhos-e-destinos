import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('caminhos_e_destinos', 'root', '03102002', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;