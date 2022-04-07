const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const token = require("../_shared/token");

//validate token
router.get("/validateToken", users.validateToken);

//get users
router.get("/getAll", token.verify, users.getUsers);

//login a user
router.post("/login", users.login);

//register a user
router.post("/signup", users.registerUser);

//updates user information
router.put("/update", users.updateUser);

//change user password
router.put("/updatePassword", users.changePassword);

//get user information
router.get("/getUser", users.profile);

module.exports = router;
