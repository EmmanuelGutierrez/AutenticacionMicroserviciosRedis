/* exports.newInternalServerError= (req,res)=>{
  res.status(500).send({
    error:true,
    status:500,
    message:'Internal Server Error'
  })
};

exports.newBadRequest= (req,res)=>{
  res.status(400).send({
    error:true,
    status:400,
    message:'Bad Request'
  })
};

exports.success=(req,res,message='',status=200)=>{
  res.status(status).send({
    error:false,
    status,
    message
  })
} */

const { ENV } = require("../config");
class responseModel {

  constructor(status, cause, message) {
    this.status = status || 0;
    this.cause = cause || "";
    this.message = message || [];
    this.error = false;
  }

  newInternalServerError(message) {
    this.cause = "Internal server error";
    this.status = 500;
    this.message = message;
    this.error=true;
    return this
  }

  newBadRequest(message) {
    this.cause = "Bad Request";
    this.status = 400;
    this.message = message;
    this.error=true;
    return this;
  }

  newNotFound(message) {
    this.cause = "Not Found";
    this.status = 404;
    this.message = message;
    this.error=true;
    return this;
  }

  newUnauthorized(message) {
    this.cause = "Unauthorized";
    this.status = 401;
    this.message = message;
    this.error=true;
    return this;
  }

  print() {
    if (ENV === "dev" && this.error) {
      console.log(`
          👹 Error: ${this.status}
          👹 Cause: ${this.cause}
          👹 Message: ${this.message}`);
    }
    return this
  }

  send(res, status = this.status, message = this.message, cause = this.cause) {
    this.print()
    const data={
      status,
      error:this.error,
      message
    }
    if(cause){ data.cause=cause};
    return res.status(status).json(data)
  }
};

module.exports = responseModel;