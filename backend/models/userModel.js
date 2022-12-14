const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required:[true, 'Please enter your name']
    },
    lastName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    createdAt :{
        type: Date,
        default: Date.now(),
        immutable:true
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema)