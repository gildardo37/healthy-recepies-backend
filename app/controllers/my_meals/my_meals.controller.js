const TOKEN = require("../../_shared/token");
const DB = require("../../config/db.connection");
const MY_MEALS = DB.my_meals;
const MEALS = DB.meals;
const OP = DB.Sequelize.Op;
const axios = require('axios').default;

//get my meals
exports.getMyMeals = async (req, res) => {
    try {
        const token_info = TOKEN.tokenInfo(req, res);

        const meal_data = { 
            attributes: [['id_my_meal', 'id_meal'], 'calories', 'protein', 'carbohydrates', 'fat', 'date' ],
            include: {
                model: MEALS,
                attributes: ['id', 'title', 'ready_in_minutes', 'image', 'servings'  ],
            },
            where: { fk_user: token_info.id_user } 
        };

        const data = await MY_MEALS.findAll(meal_data);
        res.send({ data: data, status: 0 });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { message: error.message || "Some error occurred while retrieving your meals.", status: 1 });
    }
};

//create meal
exports.createMeal = async (req, res) => {
    try {
        const response = await insertMyMeal(req, res);

        if(response) res.send({ message: "Meal added successfully", status: 0 });
        else res.status(500).send({ message: "Couldn't add this meal, please try again ", status: 0 });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { message: error.message || "Some error occurred while retrieving your meals.", status: 1 });
    }
};

//create meal
const insertMyMeal = async (req, res) => {
    try {
        let all_meals = [];
        const token_info = TOKEN.tokenInfo(req, res);
        const my_meal = {
            calories: req.body.nutrients.calories,
            protein: req.body.nutrients.protein,
            carbohydrates: req.body.nutrients.carbohydrates,
            fat: req.body.nutrients.fat,
            fk_user: token_info.id_user
        }
        const data_my_meal = await MY_MEALS.create(my_meal);

        if(data_my_meal){
            req.body.meals.map( meal => {
                all_meals.push({
                    id: meal.id,
                    title: meal.title,
                    ready_in_minutes: meal.readyInMinutes,
                    servings: meal.servings,
                    image: meal.sourceUrl,
                    fk_my_meal: data_my_meal.id_my_meal
                })
            })

            const response = await MEALS.bulkCreate(all_meals);
            if(response) return true;
            else return false;
        }
        else return false;
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send( { message: error.message || "Some error occurred while retrieving your meals.", status: 1 });
    }
};

exports.getRandomMeal = async (req, res) => {
    try {
        const data = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
            params: { targetCalories: '2233.72', timeFrame: 'day' },
            headers: {
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': 'db42bd4e2cmsh79e67a7437d6e45p1b9c09jsn8de802a6c63e'
            }
        };
        const response = await axios.request(data);
        res.send(response.data)

    } catch (error) {
        return res.status(500).send( { message: error.message || "Some error occurred while retrieving your meals.", status: 1 });
    }
}

//create meal
exports.deleteMeal = async (req, res) => {
    try {
        const { id_meal } = req.params;
        const user_info = await TOKEN.tokenInfo(req, res);
        const all_meals = await MEALS.destroy({ where: { fk_my_meal: id_meal } });

        if(all_meals === 0){
            return res.status(500).send({ message: "Couldn't delete this meal, please try again ", status: 1 });
        }
        
        const my_meal = await MY_MEALS.destroy({ where: { id_my_meal: id_meal, fk_user: user_info.id_user } });
        
        if(my_meal !== 0) res.send({ message: "Meal deleted successfully", status: 0 });
        else res.status(500).send({ message: "Couldn't delete this meal, please try again ", status: 1 });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { message: error.message || "Some error occurred while deleting this meal.", status: 1 });
    }
};