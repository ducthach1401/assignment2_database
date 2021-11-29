const Joi = require('joi');
module.exports.addRoomSchema = Joi.object({
    name: Joi.string().required(),
    size: Joi.number().required(),
    num: Joi.number().required().min(1),
    description: Joi.string().required(),
    furniture: Joi.object()
});

module.exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

module.exports.totalClientSchema = Joi.object({
    branch: Joi.string().required(),
    year: Joi.number().required()
});