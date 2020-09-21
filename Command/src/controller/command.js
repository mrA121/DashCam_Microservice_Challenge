const jwt = require('jsonwebtoken');
const {SECRET_KEY}=require('../config/index')
exports.command=(req,res,next)=>{
    
}


exports.get_token=(req,res,next)=>{
    imei=req.body.imei;

    if (!imei){
        const error = new Error('IMEI invalid');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
          type: 'LOGIN',
          imei: imei
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
    res.status(200).json({ token: token});
}