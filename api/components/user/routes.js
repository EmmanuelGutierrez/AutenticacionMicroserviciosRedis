const express = require('express');
const yup = require('yup');
const secure = require('./secure');
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



async function getAll(req, res,next) {

  try {
    const data = await Controller.list();
    return new responseModel().send(req,res, 200, data);

  } catch (error) {
    next(error);
  }
}

async function getOne(req, res,next) {

  try {
    const data = await Controller.get(req.params.id);
    return new responseModel().send(res, 200, data);
  } catch (error) {
    next(error);
  }
}

async function insert(req,res,next) {

  try {
    const data = req.body;
    const request = await Validator(data,userSchema);
    if (request.err) return new responseModel().newBadRequest(request.data).send(req,res);

    Controller.upsert(data)
    return new responseModel().send(req,res, 201, "Usuario creado");
  } catch (error) {
    next(error);
  }
}

async function update(req, res,next) {

  try {
    const data = req.body;

    Controller.upsert(data)
    return new responseModel().send(req,res, 201, "Usuario modificado");
  } catch (error) {
    return new responseModel().newInternalServerError(error.message).send(req,res);
  }
}

async function deleteOne(req, res,next) {
  Controller.delete(req.params.id)
    .then(() => {
      new responseModel().send(req,res, 200, "Usuario borrado");
    })
    .catch((err) => {
      new responseModel().newInternalServerError(err.message).send(req,res);
    });
}

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/add', insert);
router.put('/mod',secure('update'), update);
router.delete('/delete/:id', deleteOne);



module.exports = router