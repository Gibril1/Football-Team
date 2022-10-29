const express = require('express')
const router = express.Router()

const  { 
    createPlayer,
    getPlayers ,
    getPlayer,
    updatePlayer,
    deletePlayer
    }  = require('../controllers/playersControllers')


const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createPlayer)
router.get('/all', protect, getPlayers)
// router.get('/:id', getPlayer)
// router.put('/:id', updatePlayer)
// router.delete('/:id', deletePlayer)
router.route('/:id').get(protect, getPlayer).put(protect, updatePlayer).delete(protect, deletePlayer)

module.exports = router