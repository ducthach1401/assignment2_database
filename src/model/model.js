const mysql = require('mysql');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

var database = mysql.createConnection({
    host: process.env.SERVER,
    port: process.env.PORT_SERVER,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
});

module.exports.login = async(data) =>{
    try {
        const cmd_query = 'SELECT * FROM Client WHERE Username = "{}";'.replace('{}', data.username);
        const user = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length <= 0){
                return {
                    message: "Username or password wrong!!", 
                }
            }
            console.log(result);

        });
    
        // const result = bcrypt.compareSync(data.password, user.password);
        if (result){
            const payload = {
                _id: user._id,
                username: user.username,
                roleUser: user.roleUser
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '6h'});
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            user.refreshToken = refreshToken;
            user.save();
            return {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }
        else {
            return {
                message: "Password wrong"
            }
        }
    } catch (error) {
        throw error;   
    }
}

module.exports.regenerateAccessToken = async (refreshToken) => {
    try {
        const user = await User.findOne({refreshToken: refreshToken});
        if (user) {
            const payload = {
                _id: user._id,
                username: user.username,
                roleUser: user.roleUser
            }
            const userRefresh = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '6h'});
            return {
                accessToken: accessToken
            }
        }
        else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

module.exports.createToken = async () => {
    try {
        
    } catch (error) {
        throw error;
    }
}

module.exports.refreshToken = async (token) => {
    try {
        
    } catch (error) {
        throw error;
    }
}

module.exports.getAllClients = async () => {
    try {
        const cmd_query = 'SELECT * FROM Client';
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                return {
                    message: 'Data null'
                };
            }
            for (let data of result){
                delete data.Password;
            }
            return {
                message: 'Success',
                data: result
            }
        })
    } catch (error) {
        throw error;
    }
}

module.exports.getClient = async (data)  => {
    try {
        const cmd_query = 'SELECT * FROM Client WHERE LOCATE("{}", Client_Name) > 0;'.replace('{}', data.name);
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                return {
                    message: 'Data null'
                };
            }
            for (let data of result){
                delete data.Password;
            }
            return {
                message: 'Success',
                data: result
            }
        })
    } catch (error) {
        throw error;
    }
}

module.exports.billClient = async (data) => {
    try {
        const cmd_query = 'SELECT * FROM Client WHERE Client_ID = "{}";'.replace('{}', data.id);
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                return {
                    message: 'Data null'
                };
            }
            return {
                message: 'Success',
                data: result
            }
        })
    } catch (error) {
        throw error;
    }
}

module.exports.addRoom = async (data) => {
    try {
        
    } catch (error) {
        throw error;
    }
}

module.exports.totalClients = async (data) => {
    try {
        
    } catch (error) {
        throw error;
    }
}