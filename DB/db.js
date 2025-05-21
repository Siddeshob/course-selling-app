const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId



const UsersSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    role: Boolean,
    id: ObjectId

})


const AdminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    role: Boolean,
    id: ObjectId

})

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: String,
    imageURL: Boolean,
    createrID: ObjectId

})

const PurchaseSchema = new Schema({
    userID: ObjectId,
    courseID: ObjectId

})

const userModel = mongoose.model('Users', UsersSchema)
const courseModel = mongoose.model('Course', CourseSchema)
const adminModel = mongoose.model('Admin', AdminSchema)
const purchaseModel = mongoose.model('Perchase', PurchaseSchema)

module.exports = { userModel, courseModel, adminModel, purchaseModel }