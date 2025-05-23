const { jwt } = require("jsonwebtoken")
// require('dotenv').config()


function userMiddleware(req,res,next){
    const token=req.headers.token
    const decode=jwt.verify( token,process.env.JWT_USER_PASSWORD)
    
    if(decode){
        req.userId=decode.id
        next()
    }
    else{
        res.status(403).json({msg:'u r not sign-in....'})
    }
}

module.exports={userMiddleware}