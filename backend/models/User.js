import { DataTypes } from 'sequelize';
import sequelize from '../configs/db.js'; 
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true, 
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100], 
        },
    },
    /*googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, // Garante que o googleId seja único, se usado
    },*/
});

User .beforeCreate(async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

export default User;