const express= require('express');

const isAuth= require('../middleware/is-auth')

const alarmController = require('../controllers/alarms')

const router = express.Router();

router.post('/v1',isAuth,alarmController.postalarm)

router.get('/v1',isAuth,alarmController.getalarm)

router.get('/v2',isAuth,alarmController.filteralarm)

module.exports = router;