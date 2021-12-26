const express = require('express');
const yup = require('yup');
const secure = require('./secure');
const responseModel = require('../../../network/response');
const Validator = require('../../../utils/validator');
const Controller = require('./index');

const router = express.Router();

const postSquema = yup.object().shape({
    id: yup.string(),
    test: yup.string().required("Ingrese un texto"),
});

async function getAll(req, res, next) {

    try {
        const data = await Controller.list();
        return new responseModel().send(req, res, 200, data);

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

async function addPost(req, res, next) {

    try {
        const data = req.body;
        data.user_id = req.user.id;

        request = await Validator(data, postSquema);

        if (request.err) return new responseModel().newBadRequest(request.data).send(req, res);

        const result = await Controller.insert(data);
        return new responseModel().send(req, res, 200, result);

    } catch (error) {
        next(error);
    }
}

router.get('/', getAll);
router.get('/getOne/:id', getOne);
router.post('/add', secure('addPost'), addPost);

module.exports = router;