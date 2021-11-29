const user_routes = require('./users/users.routes');
const my_meals_routes = require('./my_meals/my_meals.routes');

module.exports = app => {

    app.use('/api/users', user_routes);
    app.use('/api/my_meals', my_meals_routes);
}

