const express=require('express');

const commandContoller= require('../controller/command')
const router = express.Router();

router.post('/v1',commandContoller.command)
router.post('/get_token/v1',commandContoller.get_token)

module.exports=router;