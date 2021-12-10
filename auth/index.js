const jwt = require('jsonwebtoken')

function sign(data) {
  return jwt.sign(data,'secret')
};

module.exports={
  sign
}