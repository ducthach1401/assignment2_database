const mysql = require('mysql');
require('dotenv').config();

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

module.exports.login = async (payload) => {
    try {
        
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

module.exports.getAllClients = async (data) => {
    try {
        
    } catch (error) {
        throw error;
    }
}

module.exports.getClient = async (data)  => {
    try {
        
    } catch (error) {
        throw error;
    }
}

module.exports.billClient = async (data) => {
    try {
        
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

// database.query('SELECT * FROM Client', (err, result) => {
//     console.log(result);
// });