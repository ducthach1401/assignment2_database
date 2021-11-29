const service = require('../model/model');

module.exports.getAllClients = async (req, res) => {
    try {
        await service.getAllClients((result) => {
            res.json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports.getClient = async (req, res) => {
    try {
        const name = {
            name: req.query.name
        }
        await service.getClient(name, (result) => {
            res.json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports.billClient = async (req, res) => {
    try {
        const id = {
            id: req.params.id
        }
        await service.billClient(id, (result) => {
            res.json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports.addRoom = async (req, res) => {
    try {
        const room = req.body;
        await service.addRoom(room, (result) => {
            res.json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports.totalClients = async (req, res) => {
    try {
        const client = req.body;
        await service.totalClients(client, (result) => {
            res.json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports.getFurniture = async (req, res) => {
    try {
        await service.getFurniture((result) => {
            res.json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports.getBranch = async (req, res) => {
    try {
        await service.getBranch((result) => {
            res.json(result);
        });
    } catch (error) {
        throw error;
    }
}

module.exports.login = async (req, res) => {
    try {
        const data = req.body;
        const result = await service.login(data);
        if (result.message == 'Success'){
            res.cookie('accessToken', result.token, {
                httpOnly: true
            });
            res.json({
                message: result.message
            })
        }
        else {
            res.json(result);
        }
    } catch (error) {
        throw error;
    }
}


module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.json({
            message: 'Success'
        });
    } catch (error) {
        throw error;
    }
}