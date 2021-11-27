const express = require('express');
const app = express();
const db = require("./app/config/db.connection");
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Healthy Recepies."});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

require("./app/models/associations");
require('./app/routes/routes')(app);
db.connection.sync();
