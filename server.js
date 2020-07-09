const express = require('express');
const dotnev = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotnev.config({ path: './config/config.env' });

connectDB();

const pillows = require('./routes/pillows');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/users', users);
app.use('/api/v1/pillows', pillows);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port 
${PORT}`.yellow.bold));