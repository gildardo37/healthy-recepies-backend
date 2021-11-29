const Sequelize = require("sequelize");
const connection  = require("../../config/db.connection");
const today = new Date();
const date = `${ today.getFullYear() }-${ (today.getMonth()+1) }-${ today.getDate() }`;

module.exports = (connection, Sequelize) => {
    const my_meals = connection.define("my_meals", {
        id_my_meal: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        calories: {
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        },
        protein: {
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        },
        carbohydrates: {
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        },
        fat: {
            type: Sequelize.DECIMAL(12,2),
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: date
        },
        fk_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    { timestamps: false });
    
    return my_meals;
};