const remote = require("./remote");
const { cacheService } = require("../config");

module.exports = new remote(cacheService.host, cacheService.port);
