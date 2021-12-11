const response = require('./response');

function errors(err,req,res,next) {
  new response().newInternalServerError().send(req,res,err.statusCode,err.message,err.cause);
}

module.exports=errors;