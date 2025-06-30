const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const protect = async(req,res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token,process.env.JWT_TOK);
            
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        catch(err){
            res.status(401).json({message:"not authorised"});
        }
    }
    else if(req.cookie.jwt){
        try{
            token = req.cookie.jwt;
            const decoded = jwt.verify(token,process.env.JWT_TOK);
            req.user = await User.findById(decoded.userid).select('-password');
            next();
        }
        catch(err){
            res.status(401).json({message:"not authorised"});
        }
    }
    else{
        res.status(401).json({message:"not authorised"});
    }
}

module.exports = {protect};

