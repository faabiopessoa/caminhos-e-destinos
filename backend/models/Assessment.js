import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.js';

const Assessment = sequelize.define('Assessment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 50],
        },
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 500],
        },
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
});

export default Assessment;