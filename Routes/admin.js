const {Router}= require('express')
const adminRouter=Router()
const {adminModel} =require('../DB/db')

adminRouter.post('/signup',(req,res)=>{
    res.json({
        msg:"admin sighup..............."
    })
})

adminRouter.post('/signin',(req,res)=>{
    res.json({
        msg:"admin sign-in.............."
    })
})

adminRouter.post('/cources', (req,res)=>{
    res.json({
        msg:"cources createde................"
    })
})

adminRouter.put('/cources', (req,res)=>{
    res.json({
        msg:"cources updated................"
    })
})

adminRouter.get('/cources/bulk', (req,res)=>{
    res.json({
        msg:"cources createde................"
    })
})

module.exports={
    adminRouter:adminRouter
}