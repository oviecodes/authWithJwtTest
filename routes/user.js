

const express = require('express')
const router = express.Router()
const { getSignUp, createUser } = require('../controllers/signUpController')
const { getLogin, authUser } = require('../controllers/loginController')
const { isauth } = require('../middleware/index')

router.route('/signup')
    .get(getSignUp)
    .post(createUser)

router.route('/login')
    .get(getLogin)
    .post(authUser)

router.route('/dashboard')
    .all(isauth)
    .get(async(req, res) => {
        res.send('welcome to your dashboard')
    })
    .post()

module.exports = router