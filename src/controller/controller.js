const service = require('../model/model');

module.exports.getAllClients = async (req, res) => {
    const result = await service.getAllClients();
    res.json(result)
}

module.exports.getClient = async (req, res) => {
    
}

module.exports.billClient = async (req, res) => {
    
}

module.exports.addRoom = async (req, res) => {
    
}

module.exports.totalClients = async (req, res) => {
    
}
