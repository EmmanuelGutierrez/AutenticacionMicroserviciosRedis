const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const responseModel = require('../../../network/response');
const TABLA = 'auth'
module.exports = function (store = require('../../../store/dummy')) {

  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    };
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    };
    return store.upsert(TABLA, authData);
  };

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });

    if(!data){
      return null;
    }
    const correctPass = await bcrypt.compare(password, data.password);
    if (!correctPass) {
      return null;
    }
    delete data.password;
    return auth.sign(data);

  }

  return {
    upsert,
    login
  }
};