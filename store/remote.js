const request = require('request');
const axios = require('axios');

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    function req(method, table, data) {

        let id = "";
        let body;
        if (data) {
            id = data.id;
            body = data.data;
        }
        //const { id, body } = data;
        let url = `${URL}/${table}`;
        if (id) {
            url += `/${id}`;
        }

        return new Promise((resolve, reject) => {
            axios({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                data: body
            }).then((data) => {
                return resolve(data.data);
            }).catch((err) => {
                console.log('Error en la base de datos remota: ', err);
                return reject(err.message);
            })
        });
    }

    function list(table) {
        return req('GET', table);
    };

    function get(table, id) {
        return req('GET', table, { id })
    };

    //function upsert(table, data)
    function insert(table, data) {
        return req('POST', table, { data });
    }
    // function query(table, query, join)

    return {
        list,
        get,
        insert
    }
};

module.exports = createRemoteDB;