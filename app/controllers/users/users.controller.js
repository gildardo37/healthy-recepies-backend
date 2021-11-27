const TOKEN = require("../../_shared/token");
const DB = require("../../config/db.connection");
const USER = DB.users;
const OP = DB.Sequelize.Op;

//get all users
exports.getUsers = async (req, res) => {
    try {
        const data = await USER.findAll();
        res.send({ data: data, status: 0 });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { message: "Some error occurred while retrieving users.", status: 1 });
    }
};

//login a user
exports.login = async (req, res) => {
    try {
        const query = await USER.findOne({
            attributes: [ 'id_user', 'email', 'name' ],
            where: {  email: req.body.email, password: req.body.password }
        })

        if(query == null){
            res.status(404).send({ message: "Wrong user or password, try again.", status: 1 });
            return;
        }

        const token_data = {
            id_user: query.id_user,
            email: query.email,
            name: query.name
        }

        const data = await TOKEN.create(token_data, "5d");
        res.send( { token: data } );
    }
    catch (error) {
        res.status(500).send( { message: "Some error occurred while retrieving users.", status: 1});
    }
}

//register a user
exports.registerUser = async (req, res) => {
    try {
        const verifyEmail = await userExists(req.body.email);
        if(verifyEmail) return res.status(404).send( { message: "This email already exists, please use another email." , status: 1 });
        
        const user_data = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            gender: req.body.gender
        };
        const data = await USER.create(user_data);
        if(data.dataValues){
            const req = { body: { password: user_data.password, email: user_data.email } }
            this.login(req, res);
        } 
        else res.status(404).send({ message: "Some error occurred while creating this user. Try again." , status: 1 });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { message: "Some error occurred while creating this user. Try again.", status: 1 });
    }
}

//get users information
exports.profile = async (req, res) => {
    try {
        const token_info = TOKEN.tokenInfo(req, res);
        const filter = { 
            where: { id_user: token_info.id_user } 
        }
        const data = await USER.findOne(filter);

        if(data === null) res.status(404).send({ message: "This user doesn't exists or you don't have permission to this information.", status: 1 });
        res.send({ data: data, status: 0 });
    } 
    catch (error) {
        res.status(500).send( { message: error.message || "Some error occurred while retrieving users.", status: 1});
    }
};

//updates a user
exports.updateUser = async (req, res) => {
    try {
        const user_data = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            gender: req.body.gender
        };
        const token_info = TOKEN.tokenInfo(req, res);
        const filter = { 
            where: { id_user: token_info.id_user } 
        }
        const data = await USER.update(user_data, filter);
        console.log(data);
        if(data[0] != 0) res.send( { message: "User updated correctly!" , status: 0 });
        else res.status(404).send({ message: "Some error occurred while updating this user." , status: 1 });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send( { message: "Some error occurred while updating this user.", status: 1 });
    }
}

const userExists = async (email) => {
    try {
        const data = await USER.findOne({ where: { email } });
        if(data) return data.dataValues
        return false;
    } 
    catch (error) {
        console.log(error);
        return false;
    }
}