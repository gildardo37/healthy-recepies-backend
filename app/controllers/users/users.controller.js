const db = require("../../config/db.connection");
const User = db.users;
const Op = db.Sequelize.Op;



//get all users
exports.getAllUsers = async (req, res) => {
    console.log("get users");
};