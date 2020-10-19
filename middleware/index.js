

require('dotenv').config()
const jwt = require('jsonwebtoken')

const isauth = async(req, res, next) => {

    const token = req.header('x-auth-token')
    //no token
    if(!token) {
        return res.status(400).json({ msg: 'unauthorized' })
    } 
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
        if(err){
            return res.status(400).json({ msg: 'unauthorized' })
        } else {
            req.user = decoded;
            next()
        }
    })
}

module.exports = {
    isauth
}