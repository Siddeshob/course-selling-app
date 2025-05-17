const express= require('express')

const {userRoutes}=require('./Routes/user')
const {courseRouter}=require('./Routes/course')
const {adminRouter}=require('./Routes/admin')

const app=express()

app.use('/user',userRoutes)
app.use('/course',courseRouter)
app.use('/admin',adminRouter)







app.listen(3000,()=>{
    console.log('searver started.......')
})