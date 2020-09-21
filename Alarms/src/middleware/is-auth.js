const jwt=require('jsonwebtoken')
const SECRET_KEY= require('../utils/secret_key')

module.exports = (req,res,next)=>{
    let authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Authorisation Failed');
        error.statusCode = 401;
        throw error;
      }
    let decodedToken;
    try {
        decodedToken = jwt.verify(authHeader, SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken||decodedToken.type!=='LOGIN') {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    
    req.imei = decodedToken.imei;
    next();
}