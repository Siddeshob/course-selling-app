const express = require('express')
const mongoose = require('mongoose')

const { userRoutes } = require('./Routes/user')
const { courseRouter } = require('./Routes/course')
const { adminRouter } = require('./Routes/admin')
require('dotenv').config();

const app = express()

app.use(express.json())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/admin', adminRouter)


async function main() {
    await mongoose.connect(`${process.env.DB_CONNECTION_URL}`)
    console.log('connection established......')
    app.listen(3000, () => {
        console.log('searver started.......')
    })
}
main()
