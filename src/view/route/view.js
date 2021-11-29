const express = require('express');
const router = express.Router();
const path = require('path');
const dirHtml = __dirname + '/../html'
const dirCss = __dirname + '/../css'

router.get('/', function(req, res) {
        if (req.cookies.accessToken){
                res.sendFile(path.resolve(dirHtml + '/home.html'));
        }
        else {
                res.redirect('/login');
        }
});


router.get('/room', function(req, res) {
        if (req.cookies.accessToken){
                res.sendFile(path.resolve(dirHtml + '/room.html'));
        }
        else {
                res.redirect('/login');
        }});

router.get('/statistic', function(req, res) {
        if (req.cookies.accessToken){
                res.sendFile(path.resolve(dirHtml + '/statistic.html'));
        }
        else {
                res.redirect('/login');
        }});

router.get('/login', function(req, res) {
        if (req.cookies.accessToken){
                res.redirect('/');
        }
        else {
                res.sendFile(path.resolve(dirHtml + '/login.html'));
        }
});
module.exports = router