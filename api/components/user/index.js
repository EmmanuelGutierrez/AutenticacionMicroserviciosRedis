//const store = require('../../../store/mysql');
const { remoteDB } = require("../../../config");
let store;
if (remoteDB) {
  store = require("../../../store/remote-mysql");
} else {
  store = require("../../../store/mysql");
}
const ctrl = require("./controller");

module.exports = ctrl(store);
