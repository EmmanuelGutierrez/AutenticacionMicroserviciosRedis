const { nanoid } = require('nanoid');

const TABLA = "posts";


module.exports = function(store = require('../../../store/dummy')) {
    return {
        list: () => {
            return store.list(TABLA)
        },
        get: (id) => {
            return store.get(TABLA, id);
        },
        insert: (data) => {
            data.id = data.id ? data.id : nanoid();
            return store.upsert(TABLA, data)
        }

    }
}