const db = require("../config/db.connection")

//Relation table my_meals - meals
db.my_meals.hasMany(db.meals, {foreignKey: "fk_my_meal"});
db.meals.belongsTo(db.my_meals, {foreignKey: "fk_my_meal"});

//Relation table users - health
db.health.hasOne(db.users, {foreignKey: "fk_health"});
db.users.belongsTo(db.health, {foreignKey: "fk_health"});
