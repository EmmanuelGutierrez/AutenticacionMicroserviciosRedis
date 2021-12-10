const express = require('express');
const yup = require('yup');
const responseModel = require('../../../network/response');
const Validator = require('../../../utils/validator');
const Controller = require('./index');

const router = express.Router();

const userSchema = yup.object().shape({
  id: yup.string(),
  name:yup.string().required("Ingrese un nombre"),
  username:yup.string().required("Ingrese un username"),
  password:yup.string().required("Ingrese una contraseña")
});



async function getAll(req, res) {

  try {
    
    const data = await Controller.list();
    return new responseModel().send(res, 200, data);
  } catch (error) {
    return new responseModel().newInternalServerError(error.message).send(res);
  }
}

async function getOne(req, res) {

  try {
    const data = await Controller.get(req.params.id);
    return new responseModel().send(res, 200, data);
  } catch (error) {
    return new responseModel().newInternalServerError(error.message).send(res);
  }
}

async function post(req, res) {

  try {
    const data = req.body;
    const request = await Validator(data,userSchema);
    if (request.err) return new responseModel().newBadRequest(request.data).send(res);

    Controller.upsert(data)
    return new responseModel().send(res, 201, "Usuario creado");
  } catch (error) {
    return new responseModel().newInternalServerError(error.message).send(res);
  }
}

async function deleteOne(req, res) {
  Controller.delete(req.params.id)
    .then(() => {
      new responseModel().send(res, 200, "Usuario borrado");
    })
    .catch((err) => {
      new responseModel().newInternalServerError(err.message).send(res);
    });
}

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/add', post);
router.delete('/delete/:id', deleteOne);



module.exports = router