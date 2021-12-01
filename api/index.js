const express = require('express');

const config= require('../config');
const user= require('./components/user/routes');

const app = express();
//Route
app.use('/api/user',user);

app.listen(config.api.port,()=>{
  console.log('Api escuchando en el puerto: ',config.api.port);
})