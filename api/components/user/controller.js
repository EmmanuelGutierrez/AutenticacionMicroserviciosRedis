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
        follow: (from, to) => {
            return store.upsert('users_followers', {
                user_from: from,
                user_to: to
            })
        },
        followers: (user_from) => {
            const join = {};
            join[TABLA] = 'user_to';
            const query = { user_from };
            return store.query('users_followers', query, join)
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