const express = require('express');
const router = express.Router();
const my_meals = require("../../controllers/my_meals/my_meals.controller");
const token = require("../../_shared/token");

//get my meals
router.get("/getAll", token.verify, my_meals.getMyMeals);

//create meal
router.post("/createMeal", token.verify, my_meals.createMeal);

//get meals from 3rd API
router.get("/getMeals", my_meals.getRandomMeal);

//delete meal
router.delete("/deleteMeal/:id_meal", token.verify, my_meals.deleteMeal);

module.exports = router;