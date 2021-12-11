function err(message,code,cause) {
  const e = new Error(message);

  if(code){
    e.statusCode=code;
  };
  if(cause){
    e.cause=cause;
  }
  return e;
}

module.exports=err;