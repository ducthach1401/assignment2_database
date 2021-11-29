const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = async function authenticateToken (req, res, next) {
    const token = req.cookies.accessToken;
    if (token){
        try {
            const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
            res.locals.username = decoded.username;
            next();
        }
        catch(err) {
            res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(403);
    }
}