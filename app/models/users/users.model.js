const Sequelize = require("sequelize");
const connection  = require("../../config/db.connection");

module.exports = (connection, Sequelize) =>{
    const users = connection.define("users", {
        id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.STRING,
            allowNull: false
        },
        height: {
            type: Sequelize.STRING,
            allowNull: false
        },
        weight: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    { timestamps: false });

    return users;
};