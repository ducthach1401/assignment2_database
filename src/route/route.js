const express = require('express');
const controller = require('../controller/controller');

const route = express.Router();

// route.route('/login')
//     .post(controller.login);

route.route('/clients')
    .get(controller.getAllClients)
    .post(controller.totalClients);

route.route('/room')
    .post(controller.addRoom);

route.route('/clients/find')
    .post(controller.getClient);

module.exports = route;

