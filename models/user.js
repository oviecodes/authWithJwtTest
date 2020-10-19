

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(){
    
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, async(err, salt) => {
            bcrypt.hash(this.password, salt, async(err, hash) => {
                if(err){
                    reject(new Error('something went wrong'))
                }
                resolve (this.password = hash)
            });
        });
    })

})

userSchema.methods.validPassword = async function(password) {
    
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, res) {
            if(err) {
                reject(new Error('something went wrong'))
            } else{
                resolve(res)
            }
        });
    })
    
}

module.exports = mongoose.model('user', userSchema)