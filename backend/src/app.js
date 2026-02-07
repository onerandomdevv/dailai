const express = require('express');
const ussdRoutes = require('./routes/ussd.routes');
const smsRoutes = require('./routes/sms.routes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/ussdRoutes', ussdRoutes);
app.use('/sms', smsRoutes);
app.use('/voice', require('./routes/voice.routes'));
app.use('/api', require('./routes/call.routes'));

module.exports = app;
