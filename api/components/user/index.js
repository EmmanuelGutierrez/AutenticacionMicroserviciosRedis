//const store = require('../../../store/mysql');
const { remoteDB } = require("../../../config");
let store, cache;
if (remoteDB) {
  store = require("../../../store/remote-mysql");
  cache = require("../../../store/remote-cache");
} else {
  store = require("../../../store/mysql");
  cache = require("../../../store/redis");
}
const ctrl = require("./controller");

module.exports = ctrl(store, cache);
