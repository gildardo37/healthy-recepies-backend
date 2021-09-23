const db_config = require("./config");
const Sequelize = require("sequelize");
const db = {};

const connection = new Sequelize(
    db_config.DB,
    db_config.USER,
    db_config.PASSWORD,
    {
        host: db_config.HOST,
        dialect: db_config.DIALECT,
        pool: {
            max: db_config.pool.max,
            min: db_config.pool.min,
            acquire: db_config.pool.acquire,
            idle: db_config.pool.idle
        }
    }
);

db.Sequelize = Sequelize;
db.connection = connection;

//Require models
db.users = require("../models/users/users.model")(connection, Sequelize);

//export DB
module.exports = db;