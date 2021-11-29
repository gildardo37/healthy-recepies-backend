const Sequelize = require("sequelize");
const connection  = require("../../config/db.connection");

module.exports = (connection, Sequelize) => {
    const meals = connection.define("meals", {
        id_meal: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ready_in_minutes: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        servings: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fk_my_meal: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },
    { timestamps: false });

    return meals;
};