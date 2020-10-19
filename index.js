

const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const PORT = 3000

const app = express()

mongoose.connect(`mongodb://localhost:27017/jwtauth`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`connected to mongodb`)
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRoute)

app.get('/', async(req, res, next) => {
    res.status(200).send(`Welcome to the homepage`)
})

app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`)
})