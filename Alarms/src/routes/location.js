const express= require('express');
const isAuth= require('../middleware/is-auth')

const Location= require('../models/location')
const locationController =require('../controllers/location');

const router = express.Router();



router.post('/v1',isAuth,locationController.postlocation)
router.get('/v1',isAuth, locationController.getlocation)

module.exports = router;