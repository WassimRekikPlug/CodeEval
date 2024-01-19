var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
var cors = require('cors');

var indexRouter = require('./routes/index');


var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request for ${req.url}`);
    next();
});
app.get('/health', (req, res) => {
    res.json({ message: 'Server is healthy' });
});
app.use('/api', indexRouter);


module.exports = app;
