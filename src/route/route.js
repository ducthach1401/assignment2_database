const express = require('express');
const controller = require('../controller/controller');

const route = express.Router();

route.route('/client/:id')
    .get(controller.billClient);

route.route('/clients')
    .get(controller.getAllClients)
    .post(controller.totalClients);

route.route('/room')
    .post(controller.addRoom)
    .get(controller.getFurniture);

route.route('/client')
    .get(controller.getClient);

route.route('/branch')
    .get(controller.getBranch);
module.exports = route;

