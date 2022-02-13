require("dotenv").config();
require("./config/db").connect();
const express = require("express");
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var pegawaiRouter = require('./routes/pegawai');
var apiRouter = require('./routes/api');
var verifyToken = require('./middleware/auth');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = __dirname + '/views/';
app.use(express.static(path));
// app.use(cors())
// app.options('*', cors());

// USE CORS
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/login', loginRouter);
app.use('/api/pegawai', verifyToken);
app.use('/api/pegawai', pegawaiRouter);

module.exports = app;