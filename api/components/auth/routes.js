const express = require('express');
const yup = require('yup');
const responseModel = require('../../../network/response');
const Validator = require('../../../utils/validator');
const Controller = require('./index');

const router = express.Router();

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token =await Controller.login(username, password);
    if(!token){
      return new responseModel().newBadRequest('Informacion invalida').send(res);
    }
    return new responseModel().send(res, 200, token);
  } catch (error) {
    return new responseModel().newInternalServerError(error.message).send(res);
  }
}

router.post('/login', login);

module.exports = router;
