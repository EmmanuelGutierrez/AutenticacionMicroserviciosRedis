const express = require('express');
const config= require('../config');
const swaggerUi= require('swagger-ui-express');
const cors= require('cors');

const user= require('./components/user/routes');
const auth = require('./components/auth/routes');

const swaggerDoc=require('./components/user/schema.json');

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
	origin: "*",
	allowedHeaders: "*"
}));

//Route
app.use('/api/auth',auth);
app.use('/api/user',user);
app.use('/api-docs/user',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

app.listen(config.api.port,()=>{
  console.log('Api escuchando en el puerto: ',config.api.port);
})