const jwt = require('jsonwebtoken')

function sign (payload, secret, callback){
    jwt.sign(payload, secret,callback)
}

function verify(token,secrt,callback){
    jwt.verify(token, secrt, callback)
}

module.exports={
    sign,
    verify
}