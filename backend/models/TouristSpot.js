import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.js';
import Assessment from './Assessment.js';

const TouristSpot = sequelize.define('TouristSpot', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

TouristSpot.hasMany(Assessment, {
    foreignKey: 'touristSpotId', 
    as: 'assessments', 
});

export default TouristSpot;