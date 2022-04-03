const express = require("express");
const router = express.Router();
const my_meals = require("../controllers/my_meals.controller");
const token = require("../_shared/token");

//get my meals
router.get("/getAll", token.verify, my_meals.getMyMeals);

//get meal by id
router.get("/getMeal/:idMeal", token.verify, my_meals.getOneMeal);

//get daily meal
router.get("/dailyMeal", token.verify, my_meals.getDailyMeal);

//create meal
router.post("/createMeal", token.verify, my_meals.createMeal);

//check a meal in a day
router.put("/checkMeal", token.verify, my_meals.checkMeal);

//delete meal
router.delete("/deleteMeal/:id_meal", token.verify, my_meals.deleteMeal);

module.exports = router;
