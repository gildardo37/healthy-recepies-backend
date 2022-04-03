const {
  sendData,
  sendError,
  sendMessage,
  currentDate,
  compareDates,
} = require("../_shared/helpers");
const TOKEN = require("../_shared/token");
const DB = require("../config/db.connection");
const MY_MEALS = DB.my_meals;
const MEALS = DB.meals;
const OP = DB.Sequelize.Op;

//get my meals
exports.getMyMeals = async (req, res) => {
  try {
    const token_info = TOKEN.tokenInfo(req, res);
    const query = {
      attributes: [
        ["id_my_meal", "id_meal"],
        "calories",
        "protein",
        "carbohydrates",
        "fat",
        "date_created",
      ],
      include: {
        model: MEALS,
        attributes: [
          "id_meal",
          "title",
          "type",
          "checked",
          "ready_in_minutes",
          "image",
          "servings",
        ],
      },
      where: { fk_user: token_info.id_user },
    };

    const data = await MY_MEALS.findAll(query);
    sendData(res, data, 0);
  } catch (error) {
    console.log(error);
    sendError(res, error.message, 1);
  }
};

//get meal by id
exports.getOneMeal = async (req, res) => {
  try {
    const { idMeal } = req.params;
    const token_info = TOKEN.tokenInfo(req, res);
    console.log(token_info);
    const query = {
      attributes: [
        ["id_my_meal", "id_meal"],
        "calories",
        "protein",
        "carbohydrates",
        "fat",
        "date_created",
      ],
      include: {
        model: MEALS,
        attributes: [
          "id_meal",
          "type",
          "checked",
          "title",
          "ready_in_minutes",
          "image",
          "servings",
        ],
        where: { id_meal: idMeal },
      },
      where: { fk_user: token_info.id_user },
    };

    const data = await MY_MEALS.findOne(query);
    data.dataValues.meal = data.dataValues.meals[0];
    delete data.dataValues.meals;
    sendData(res, data, 0);
  } catch (error) {
    console.log(error);
    sendError(res, error.message, 1);
  }
};

//get daily meal
exports.getDailyMeal = async (req, res) => {
  try {
    const { startDay, endDay } = compareDates();
    const token_info = TOKEN.tokenInfo(req, res);
    const query = {
      attributes: [
        ["id_my_meal", "id_meal"],
        "calories",
        "protein",
        "carbohydrates",
        "fat",
        "date_created",
      ],
      include: {
        model: MEALS,
        attributes: [
          "id_meal",
          "type",
          "checked",
          "title",
          "ready_in_minutes",
          "image",
          "servings",
        ],
        where: { checked: false },
      },
      where: {
        fk_user: token_info.id_user,
        date_created: {
          [OP.between]: [startDay, endDay],
        },
      },
    };

    const data = await MY_MEALS.findOne(query);
    if (data) {
      data.dataValues.meal = data.dataValues.meals[0];
      delete data.dataValues.meals;
    }
    sendData(res, data, 0);
  } catch (error) {
    console.log(error);
    sendError(res, error.message, 1);
  }
};

//create meal
exports.createMeal = async (req, res) => {
  try {
    const response = await insertMyMeal(req, res);

    if (response) sendMessage(res, "Meal added successfully", 0);
    else sendMessage(res, "Couldn't add this meal, please try again ", 1);
  } catch (error) {
    console.log(error);
    sendError(res, error.message, 1);
  }
};

//delete meal
exports.deleteMeal = async (req, res) => {
  try {
    const { id_meal } = req.params;
    const user_info = await TOKEN.tokenInfo(req, res);
    const my_meal = await MY_MEALS.destroy({
      where: { id_my_meal: id_meal, fk_user: user_info.id_user },
    });

    if (my_meal !== 0) sendMessage(res, "Meal deleted successfully", 0);
    else sendMessage(res, "Couldn't delete this meal, please try again", 0);
  } catch (error) {
    console.log(error);
    sendError(res, error.message, 1);
  }
};

//check meal
exports.checkMeal = async (req, res) => {
  try {
    const data = { checked: req.body.checked };
    const filter = { where: { id_meal: req.body.id_meal } };
    const response = await MEALS.update(data, filter);

    if (response[0] !== 0) {
      sendMessage(res, "Meal checked successfully.", 0);
    } else {
      sendMessage(res, "Couldn't check this meal.", 1);
    }
  } catch (error) {
    console.log(error);
    sendError(res, error.message, 1);
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
      date_created: currentDate(),
      fat: req.body.nutrients.fat,
      fk_user: token_info.id_user,
    };
    const data_my_meal = await MY_MEALS.create(my_meal);

    if (data_my_meal) {
      req.body.meals.forEach((meal, index) => {
        let type = "Breakfast";
        if (index === 1) type = "Meal";
        if (index === 2) type = "Dinner";

        all_meals.push({
          id: meal.id,
          title: meal.title,
          ready_in_minutes: meal.readyInMinutes,
          servings: meal.servings,
          image: meal.sourceUrl,
          type: type,
          fk_my_meal: data_my_meal.id_my_meal,
        });
      });

      const response = await MEALS.bulkCreate(all_meals);
      if (response) return true;
      else return false;
    } else return false;
  } catch (error) {
    console.log(error);
    return sendError(res, error.message, 1);
  }
};
