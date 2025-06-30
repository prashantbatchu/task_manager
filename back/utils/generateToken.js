const jwt = require('jsonwebtoken');

const generateToken = (res,userid) => {
    const token =jwt.sign({userid},process.env.JWT_TOK,{
        expiresIn : '1d',
    });
    res.cookie('jwt',token,{
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
    });
}



module.exports = generateToken;