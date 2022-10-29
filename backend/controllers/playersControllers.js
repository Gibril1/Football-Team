const Player = require('../models/playersModel')
const asyncHandler = require('express-async-handler')

const createPlayer = asyncHandler(async(req, res) => {
    const data = req.body
    if(
        !data['firstName'] || 
        !data['lastName'] || 
        !data['lastName'] || 
        !data['email'] || 
        !data['dob'] || 
        !data['position'] ||  
        !data['nationality'] || 
        !data['club']) {
            res.status(400)
            throw new Error('Please enter all fields')
    }
    try {
        const player = await Player.create({ 
            firstName: data['firstName'],
            lastName: data['lastName'],
            email: data['email'],
            age: data['age'],
            dob: data['dob'],
            position: data['position'],
            height: data['height'],
            nationality: data['nationality'],
            club: data['club'],
         })
        res.status(200)
        res.json(player)
    } catch(error){
        console.log(error.message)
    }
    
})


const getPlayers = asyncHandler(async(req, res) => {
    const players = await Player.find()
    res.status(200).json(players)
})

const getPlayer = asyncHandler(async(req, res) => {
    const player = await Player.findById(req.params.id)
    res.status(200).json(player)
})

const updatePlayer = asyncHandler(async(req, res) => {
    const player = await Player.findById(req.params.id)

    if(!player){
        res.status(404)
        throw new Error(`Player with such id ${req.params.id}  does not exist` )
    }

    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true  })
    res.status(201).json(updatedPlayer)
        
     

    
})

const deletePlayer = asyncHandler(async(req, res) => {
    const player = await Player.findById(req.params.id)

    if(!player) {
        res.status(404)
        throw new Error(`Player with such id ${req.params.id}  does not exist` )
    }

    await player.remove()

    res.status(200).json({'id': req.params.id})
})
module.exports = {
    createPlayer,
    getPlayers,
    getPlayer,
    updatePlayer,
    deletePlayer
}

