const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

mongoose.connect(`mongodb+srv://${config.db_username}:${config.db_password}@${config.db_host}/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.once('open', (err, res) => {
  if(err) {
    console.error("Connection error", err);
    process.exit();
  }

  console.log("MONGO CONNECTED");
});

app.use('/users', usersRouter);
app.use('/', indexRouter);

module.exports = app;
