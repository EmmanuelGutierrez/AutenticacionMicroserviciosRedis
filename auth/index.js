const jwt = require('jsonwebtoken');
const config = require('../config');
const err = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret)
};

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req)

        if (decoded.id !== owner) {
            throw new err("No puedes hacer esto", 401, "Unauthorized")
        }
    },
    logged: function(req, owner) {
        const decoded = decodeHeader(req)
            //console.log(decoded);
    }
};

function getToken(auth) {
    if (!auth) {
        throw new err("No vienen token", 401, "Unauthorized")
    }

    if (auth.indexOf('Bearer ', -1)) {
        throw new err("Formato invalido", 401, "Unauthorized")
    }

    const token = auth.replace('Bearer ', '');

    return token;

}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
}