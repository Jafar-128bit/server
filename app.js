const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const indexRouter = require("./routes/index");
const boardRoutes = require("./routes/boardRouter");
const columnRouter = require("./routes/columnRouter");
const cardRouter = require("./routes/cardRouter");
const userAuth = require("./routes/authRouter");
const statsCheck = require("./routes/appStatsRouter");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1', boardRoutes);
app.use('/api/v1', columnRouter);
app.use('/api/v1', cardRouter);
app.use('/api/v1', userAuth);
app.use('/api/v1', statsCheck);

module.exports = app;
