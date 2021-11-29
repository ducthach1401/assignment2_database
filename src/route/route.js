const express = require('express');
const controller = require('../controller/controller');
const { addRoomSchema, totalClientSchema, loginSchema } = require('../DTO/DTO');
const authenUser = require('../middleware/authen.user');
const validate = require('../middleware/valid.body');

const route = express.Router();

route.route('/login')
    .post(validate(loginSchema), controller.login);

route.route('/logout')
    .get(controller.logout);

route.route('/client/:id')
    .get(authenUser, controller.billClient);

route.route('/clients')
    .get(authenUser, controller.getAllClients)
    .post(authenUser, validate(totalClientSchema), controller.totalClients);

route.route('/room')
    .post(authenUser,validate(addRoomSchema), controller.addRoom)
    .get(authenUser, controller.getFurniture);

route.route('/client')
    .get(controller.getClient);

route.route('/branch')
    .get(controller.getBranch);

module.exports = route;

