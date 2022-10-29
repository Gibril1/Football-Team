const express = require('express')
const router = express.Router()

const { 
    registerUser, 
    loginUser, 
    getUser ,
    getUsers
} = require('../controllers/userControllers')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUser)
router.get('/users', getUsers)

module.exports = router