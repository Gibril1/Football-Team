const express = require('express')
const router = express.Router()

const  { 
    createPlayer,
    getPlayers ,
    getPlayer,
    updatePlayer,
    deletePlayer
    }  = require('../controllers/playersControllers')

router.post('/', createPlayer)
router.get('/all', getPlayers)
// router.get('/:id', getPlayer)
// router.put('/:id', updatePlayer)
// router.delete('/:id', deletePlayer)
router.route('/:id').get(getPlayer).put(updatePlayer).delete(deletePlayer)

module.exports = router