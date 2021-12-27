const express = require('express');
const yup = require('yup');
const secure = require('./secure');
const responseModel = require('../../../network/response');
const Validator = require('../../../utils/validator');
const Controller = require('./index');

const router = express.Router();

const userInsertSchema = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    username: yup.string().required("Ingrese un username"),
    password: yup.string().required("Ingrese una contraseña")
});

const userUpdateSchema = yup.object().shape({
    name: yup.string(),
    username: yup.string(),
});


async function getAll(req, res, next) {
    try {
        const data = await Controller.list();
        return new responseModel().send(req, res, 200, data.message);

    } catch (error) {
        next(error);
    }
}

async function getOne(req, res, next) {
    try {
        const data = await Controller.get(req.params.id);

        return new responseModel().send(req, res, 200, data);
    } catch (error) {
        next(error);
    }
}

async function follow(req, res, next) {
    try {
        const data = await Controller.follow(req.user.id, req.params.id);
        return new responseModel().send(req, res, 201, data.message);
    } catch (error) {
        next(error);
    }
}

async function followers(req, res, next) {
    try {
        const data = await Controller.followers(req.params.id);
        return new responseModel().send(req, res, 200, data);
    } catch (error) {
        next(error);
    }
}

/* async function upsert(req, res, next) {

    try {
        const data = req.body;
        let request;
        if (req.method === 'POST') {
            request = await Validator(data, userInsertSchema);
        } else {
            request = await Validator(data, userUpdateSchema);
        }
        if (request.err) return new responseModel().newBadRequest(request.data).send(req, res);

        const result = await Controller.upsert(data)
        return new responseModel().send(req, res, 201, result);
    } catch (error) {
        next(error);
    }
} */

async function insert(req, res, next) {

    try {
        const data = req.body;
        const request = await Validator(data, userInsertSchema);

        if (request.err) return new responseModel().newBadRequest(request.data).send(req, res);

        const result = await Controller.insert(data)
        return new responseModel().send(req, res, 201, result);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {

    try {
        const data = req.body;
        const request = await Validator(data, userUpdateSchema);

        if (request.err) return new responseModel().newBadRequest(request.data).send(req, res);

        const result = await Controller.update(data)
        return new responseModel().send(req, res, 201, result);
    } catch (error) {
        next(error);
    }
}


async function deleteOne(req, res, next) {
    Controller.delete(req.params.id)
        .then(() => {
            new responseModel().send(req, res, 200, "Usuario borrado");
        })
        .catch((err) => {
            new responseModel().newInternalServerError(err.message).send(req, res);
        });
}

router.get('/', getAll);
router.get('/getOne/:id', getOne);
router.post('/follow/:id', secure('follow'), follow);
router.get('/followers/:id', followers);
router.post('/add', insert);
router.put('/mod', secure('update'), update);
router.delete('/delete/:id', deleteOne);



module.exports = router