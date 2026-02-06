const express = require('express');
const ussdRoutes = require('./routes/ussd.routes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', ussdRoutes);

module.exports = app;
