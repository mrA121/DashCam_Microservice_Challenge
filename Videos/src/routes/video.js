const express =require('express')

const isAuth=require('../middleware/is-auth')
const videoController = require('../controllers/video')

router= new express.Router()

router.post('/v1',videoController.postvideo)

router.get('/v1',isAuth,videoController.getvideo)


module.exports= router;