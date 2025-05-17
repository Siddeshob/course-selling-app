const {Router}=require('express')
const userRoutes=Router()

userRoutes.post('/signup',(req,res)=>{
    res.json({
        msg:"signun..............."
    })
})

userRoutes.post('/signin',(req,res)=>{
    res.json({
        msg:'sinin............'
    })
})

userRoutes.get('/purchases',(req,res)=>{
    res.json({
        msg:'my purchases...................'
    })
})

module.exports={
    userRoutes:userRoutes
}