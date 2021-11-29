const mysql = require('mysql');
require('dotenv').config();
const jwt = require('jsonwebtoken')

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

// module.exports.callback = async(data) =>{
//     try {
//         return data;
//     } catch (error) {
//         throw error;   
//     }
// }

module.exports.login = async (data) => {
    try {
        if ((data.username == process.env.USERNAME) && (data.password == process.env.PASSWORD)){
            const payload = {
                username: data.username
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '6h'});
            return {
                message: 'Success',
                token: accessToken
            }
        } 
        else {
            return {
                message: 'Failed'
            }
        }
    } catch (error) {
        throw error;
    }
}
module.exports.getAllClients = async (callback) => {
    try {
        const cmd_query = 'SELECT * FROM Client';
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                callback ({
                    message: 'Failed',
                });
                return;
            }
            for (let data of result){
                delete data.Password;
            }
            callback({
                message: 'Success',
                data: result
            });
        })
    } catch (error) {
        throw error;
    }
}

module.exports.getClient = async (data, callback)  => {
    try {
        const cmd_query = 'SELECT * FROM Client WHERE LOCATE("{}", Client_Name) > 0;'.replace('{}', data.name);
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                callback ({
                    message: 'Failed'
                });
                return;
            }
            for (let data of result){
                delete data.Password;
            }
            callback ({
                message: 'Success',
                data: result
            });
        })
    } catch (error) {
        throw error;
    }
}

module.exports.billClient = async (data, callback) => {
    try {
        const cmd_query = 'SELECT * FROM Order_room WHERE ID_customer = "{}";'.replace('{}', data.id);
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                callback ({
                    message: 'Failed'
                });
                return;
            }
            for (let data of result){
                delete data.ID_customer;
                delete data.Name_service;
            }
            callback ({
                message: 'Success',
                data: result
            });
        })
    } catch (error) {
        throw error;
    }
}

module.exports.addRoom = async (data, callback) => {
    try {
        const cmd_query = 'INSERT INTO ROOM_TYPE (RoomType_Name, Room_Size, Max_Occupant, Description) VALUES ("name", size, num, "description");'
                    .replace('name',data.name)
                    .replace('size',data.size)
                    .replace('num',data.num)
                    .replace('description',data.description);

        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                callback ({
                    message: err.message
                });
                return;
            }
            let check = 0;
            for (let fur in data.furniture){
                const add_query = 'INSERT INTO ROOM_SUPPLY (Supply_ID, RoomType_ID, Quantity) VALUES ("InsertSupply", InsertRoomType, InsertQuantity);'
                    .replace("InsertSupply", fur)
                    .replace("InsertRoomType", result.insertId)
                    .replace("InsertQuantity", data.furniture[fur]);

                database.query(add_query, (err, res) => {
                    if (err){
                        check = 1;
                        return;
                    }
                });
            }
            if (check) {
                callback ({
                    message: err.message
                });
            }
            else {
                callback ({
                    message: 'Success'
                });
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports.totalClients = async (data, callback) => {
    try {
        const query = 'CALL ThongKeLuotKhach("' + data.branch + '", ' + data.year + ');';
        database.query(query, (err, result) => {
            if (err){
                callback ({
                    message: err.message
                });
                return;
            }
            callback ({
                message: 'Success',
                data: result[0]
            });
        });
    } catch (error) {
        throw error;
    }
}

module.exports.getFurniture = async (callback) => {
    try {
        const cmd_query = 'SELECT * FROM Furniture';
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                callback ({
                    message: 'Failed',
                });
                return;
            }

            callback({
                message: 'Success',
                data: result
            });
        })
    } catch (error) {
        throw error;
    }
}

module.exports.getBranch = async (callback) => {
    try {
        const cmd_query = 'SELECT * FROM Branch';
        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                throw err;
            }
            if (result.length == 0){
                callback ({
                    message: 'Failed',
                });
                return;
            }

            callback({
                message: 'Success',
                data: result
            });
        })
    } catch (error) {
        throw error;
    }
}