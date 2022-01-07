const express = require("express");
const yup = require("yup");
const responseModel = require("../network/response");
//const Validator = require('../../../utils/validator');
const Store = require("../store/redis");

const router = express.Router();

async function list(req, res, next) {
  const data = await Store.list(req.params.table);
  return new responseModel().send(req, res, 200, data);
}

async function get(req, res, next) {
  const data = await Store.get(req.params.table, req.params.id);
  console.log(data);
  return new responseModel().send(req, res, 200, data);
}

async function insert(req, res, next) {
  const data = await Store.upsert(req.params.table, req.body);
  return new responseModel().send(req, res, 200, data);
}

async function upsert(req, res, next) {
  const data = await Store.upsert(req.params.table, req.body);
  return new responseModel().send(req, res, 200, data);
}

router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", insert);
router.put("/:table", upsert);

module.exports = router;
