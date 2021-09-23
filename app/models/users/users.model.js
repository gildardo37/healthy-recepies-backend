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
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
    });

    return users;
};