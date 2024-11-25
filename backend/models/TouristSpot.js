import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.js';

const TouristSpot = sequelize.define('TouristSpot', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

export default TouristSpot;