const express= require('express');

const response = require('../../../network/response');
const Controller= require('./controller');

const router = express.Router();

router.get('/',(req,res)=>{
  const list= Controller.list();
response.success(req,res,list,200)
});

module.exports=router