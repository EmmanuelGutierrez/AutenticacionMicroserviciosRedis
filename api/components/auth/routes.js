const express = require('express');
const yup = require('yup');
const responseModel = require('../../../network/response');
const Validator = require('../../../utils/validator');
const Controller = require('./index');

const router = express.Router();

async function login(req, res,next) {
  try {
    const { username, password } = req.body;
    const token = await Controller.login(username, password);
    if (!token) {
      return new responseModel().newBadRequest('Informacion invalida').send(req,res);
    }
    return new responseModel().send(req,res, 200, token);
  } catch (error) {
    next(error);
  }
}

router.post('/login', login);

module.exports = router;
