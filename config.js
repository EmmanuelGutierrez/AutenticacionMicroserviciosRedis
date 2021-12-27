require('dotenv').config();

module.exports = {
    ENV: process.env.NODE_ENV,
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret'
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
    },
    mysqlService: {
        host: process.env.MYSQL_SRVS_HOST || 'localhost',
        port: process.env.MYSQL_SRVS_PORT || 3001

    }
}