const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    age:{
        type:Number,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    position:{
        type:String,
        required: true
    },
    height:{
        type:Number
    },
    nationality:{
        type:String,
        required: true
    },
    club:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updatedAt : {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Player', playerSchema)