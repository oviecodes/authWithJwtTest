

require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getLogin = async(req, res) => {
    res.send('Welcome to the login page')
}

const authUser = async(req, res) => {
    const { email , password } = req.body

    if(!email || !password) {
        res.json({ msg: 'please fill all fields' })
    } else {
        const user =  await User.findOne({ email })
        console.log(user)
        if(!user) {
            return res.status(400).json({ msg: 'user does not exist' })
        } else {
            const correctPassword = await user.validPassword(password)
            if(correctPassword) {
                jwt.sign({ id: user.id }, process.env.JWTSECRET, { expiresIn: 3600 }, (err, token) => {
                    if(err){
                       return res.status(400).json({ msg: 'an error occurred' })
                    } else {
                        return res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                })
            } else {
                return res.status(400).json({ msg: 'incorrect password' })
            }
        }
    }

}

module.exports = {
    getLogin,
    authUser
}