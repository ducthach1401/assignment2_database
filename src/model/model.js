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

module.exports.callback = async(data) =>{
    try {
        return data;
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
        const cmd_query = 'SELECT * FROM Order_room WHERE ID_customer = "{}";'.replace('{}', data.id);
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
                delete data.ID_customer;
                delete data.Name_service;
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
        const cmd_query = 'INSERT INTO ROOM_TYPE (RoomType_Name, Room_Size, Max_Occupant, Description) VALUES ("name", "size", "num", "description");'
                    .replace('name',data.name)
                    .replace('size',data.size)
                    .replace('num',data.num)
                    .replace('description',data.description);

        const client = await database.query(cmd_query, (err, result) => {
            if (err){
                return {
                    message: err.message
                }
            }
    
            for (let fur in data.furniture){
                const add_query = 'INSERT INTO ROOM_SUPPLY (Supply_ID, RoomType_ID, Quantity) VALUES ("InsertSupply", InsertRoomType, InsertQuantity);'
                    .replace("InsertSupply", fur)
                    .replace("InsertRoomType", result.insertId)
                    .replace("InsertQuantity", data.furniture[fur]);

                database.query(add_query, (err, result) => {
                    if (err){
                        // throw err.message;
                        return {
                            message: err.message
                        }
                    }
                    return {
                        message: 'Success'
                    }
                });
            }
        });


    } catch (error) {
        throw error;
    }
}

module.exports.totalClients = async (data) => {
    try {
        const query = 'CALL ThongKeLuotKhach("' + data.branch + '", ' + data.year + ');';
        console.log(query);
        database.query(query, (err, result) => {
            if (err){
                throw err.message;
            }
            console.log(result[0]);
            return {
                message: 'Success',
                data: result[0]
            }
        });
    } catch (error) {
        throw error;
    }
}

// const loga = this.addRoom({
//     name: 'test',
//     size: 30,
//     num: 5,
//     description: 'test',
//     furniture: {
//         'VT0001': 10,
//         'VT0002': 2
//     }
// });

// const test = this.totalClients({
//     branch: 'CN1',
//     year: 2021
// })