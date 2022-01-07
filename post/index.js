const express = require('express');

const config = require('../config.js');
const post = require('./components/post/routes');
const errors = require('../network/error');

const app = express();

app.use(express.json());

// ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log('Servicio posts escuchando en el puerto ', config.post.port);
});