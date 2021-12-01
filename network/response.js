exports.error= (req,res,message='Internal Server Error',status=500)=>{
  res.status(status).send({
    error:true,
    status,
    body:message
  })
};

exports.success=(req,res,message='',status=200)=>{
  res.status(status).send({
    error:false,
    status,
    message
  })
}

