const express = require('express');

const responseModel = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
  Controller.list()
    .then((list) => {
      new responseModel().send(res, 200, list);
    })
    .catch((err) => {
      new responseModel().newInternalServerError(err.message).send();
    });

});

router.get('/:id', (req, res) => {
  Controller.get(req.params.id)
    .then((user) => {

      new responseModel().send(res, 200, user);
    })
    .catch((err) => {
      new responseModel().newInternalServerError(err.message).send();
    });
});

router.post('/add', (req, res) => {
  const data = req.body;
  Controller.create(data)
    .then(() => {
      new responseModel().send(res, 201, "Usuario creado");
    })
    .catch((err) => {
      new responseModel().newInternalServerError(err.message).send();
    });
});


router.delete('/delete/:id', (req, res) => {
  Controller.delete(req.params.id)
    .then(() => {
      new responseModel().send(res, 200, "Usuario borrado");
    })
    .catch((err) => {
      new responseModel().newInternalServerError(err.message).send();
    });
});

module.exports = router