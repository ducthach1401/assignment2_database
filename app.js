const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const route = require('./src/route/route');
require('dotenv').config();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/src/view/'));
// app.use('/', view);
app.use('/v1/', route);
app.listen(port, () => {
    console.log("Run Server http://localhost:8080");
})