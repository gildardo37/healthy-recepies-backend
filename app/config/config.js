module.exports = {
    HOST: "us-cdbr-east-04.cleardb.com",
    USER: "b467ec19290523",
    PASSWORD: "e17f5ad7",
    DB: "heroku_1456688245aa76d",
    DIALECT: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    key: "secretkey"
}