require("dotenv").config();

module.exports = {
  ENV: process.env.NODE_ENV,
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
  mysqlService: {
    host: process.env.MYSQL_SRVS_HOST || "localhost",
    port: process.env.MYSQL_SRVS_PORT || 3001,
  },
  cacheService: {
    host: process.env.CACHE_HOST || "localhost",
    port: process.env.CACHE_PORT || 3004,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    user: process.env.REDIS_USER,
    userPass: process.env.REDIS_USER_PASS,
  },
};
