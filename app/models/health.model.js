const Sequelize = require("sequelize");
const connection = require("../config/db.connection");

module.exports = (connection, Sequelize) => {
  const health = connection.define(
    "health",
    {
      id_health: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      calories: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      imc: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return health;
};
