//const store = require('../../../store/dummy');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt')
const auth = require('../auth');
const TABLA = "users";



module.exports = function(store = require('../../../store/dummy')) {
    return {
        list: () => {
            return store.list(TABLA)
        },
        get: (id) => {
            return store.get(TABLA, id);
        },
        upsert: async(data) => {
            const user = {
                name: data.name,
                username: data.username,
            };
            user.id = data.id ? data.id : nanoid();
            if (data.password || data.username) {
                await auth.upsert({
                    id: user.id,
                    username: user.username,
                    password: data.password
                })
            }

            return store.upsert(TABLA, user);
        },
        delete: (id) => {
            return store.remove(TABLA, id);
        }
    }
}