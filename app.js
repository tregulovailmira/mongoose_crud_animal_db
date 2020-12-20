const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json({ type: 'applicaton/vnd.api+json' }));

app.use('/api', router);

module.exports = app;
