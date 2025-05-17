const {Router}=require('express')
const courseRouter=Router()

courseRouter.get('/purchases',(req,res)=>{
    res.json({
        msg:'purchases...........'
    })
})

courseRouter.get('/preview',(req,res)=>{
    res.json({
        msg:'preview..............'
    })
})

module.exports={
    courseRouter:courseRouter
}