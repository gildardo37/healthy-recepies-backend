const express = require('express');
const router = express.Router();
const users = require("../../controllers/users/users.controller");

//get users
router.get("/all", users.getUsers);
