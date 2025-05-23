const jwt = require("jsonwebtoken")
// require('dotenv').config()


function adminMiddleware(req,res,next){
    const token=req.headers.token
    const decode=jwt.verify( token,process.env.JWT_ADMIN_PASSWORD)
    
    if(decode){
        req.adminId=decode.id
        next()
    }
    else{
        res.status(403).json({msg:'u r not sign-in....'})
    }
}

module.exports={adminMiddleware}