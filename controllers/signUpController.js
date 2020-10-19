

const User = require('../models/user')

const getSignUp = async(req, res) => {
    res.status(200).send('welcome to the signup page')
}

const createUser = async(req, res) => {
    try {
        const { name, email, password } = req.body

        if(!name || !email || !password) {
            res.json({ msg: 'please fill all fields' })
        } else {
            const user = await User.findOne({ email })
            if(user) {
                res.json({ msg: 'user already exist' })
            } else {
                const newUser = await User.create(req.body)
                return res.status(200).json('new user created proceed to login', newUser)
            }
        }
    } catch (error) {
        res.status(400).json({ msg: 'an error occurred' })
    }
    
}

module.exports = {
    getSignUp,
    createUser
}