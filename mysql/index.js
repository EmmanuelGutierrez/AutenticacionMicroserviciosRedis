const express = require('express');

const config = require('../config');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('Servicio de mysql escuchando en puerto: ', config.mysqlService.port)
})