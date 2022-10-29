const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async(req, res) => {
    const data = req.body

    if(!data){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const { username, firstName, lastName, email, password } = data

    // check if user exists
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password:hashedPassword
            
        })

        if(user){
            res.status(200).json({
                _id:user.id,
                firstName,
                email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid User Data')
        }
    } catch(e) {
        console.log(e.message)
    }
    

    

})


const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('Please enter your data')
    }

    // check if user exists
    try{
        const user = await User.findOne({ email })
        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                id:user.id,
                email:user.email,
                token:generateToken(user.id)
            })
        }    
    } catch(error){
        console.log(error.message)
    }
})


const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
        username: user.username,
        email: user.email,
        password: user.password
    })
})

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
    
})
const generateToken = ( id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUsers
}