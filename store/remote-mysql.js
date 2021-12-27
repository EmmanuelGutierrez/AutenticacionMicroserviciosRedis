const remote = require('./remote');
const { mysqlService } = require('../config');

module.exports = new remote(mysqlService.host, mysqlService.port)