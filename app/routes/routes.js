const user_routes = require('./users/users.routes');


module.exports = app => {
    //users
    app.use('/api/users', user_routes);
}

