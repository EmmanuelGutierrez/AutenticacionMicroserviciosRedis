const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const err = require('../../../utils/error');
const TABLA = 'auth'
module.exports = function(store = require('../../../store/dummy')) {

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

        if (!data) {
            throw new err("Datos erroneos", 400, "Bad request");
        }
        const correctPass = await bcrypt.compare(password, data.password);
        if (!correctPass) {
            throw new err("Datos erroneos", 400, "Bad request");
        } else {

            return auth.sign({ id: data.id, username: data.username });
        }

    }

    return {
        upsert,
        login
    }
};