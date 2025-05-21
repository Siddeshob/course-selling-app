const {Router}= require('express')
const adminRouter=Router()
const {adminModel} =require('../DB/db')
const z = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Correct schema
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    firstName: z.string().min(2),
    lastName: z.string().min(1)
});

adminRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const hashPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
            email,
            password: hashPassword,
            firstName,
            lastName
        });

        res.json({ msg: 'Signup successful...' });
    }
    catch (e) {
        console.log(e);
        if (e.name === 'ZodError') {
            return res.status(400).json({ msg: e.errors });
        }
        return res.status(500).json({ msg: "Server error" });
    }
});



adminRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        //find admin
        const admin = await adminModel.findOne({ email: email })
        if (!admin) {
            res.json({ msg: `admin not found` })
        } else {

            console.log(`admin fron db is : ${admin}`)
        }

        //is admin not exist throw error msg
        console.log(`sign in cridenciles are : ${email} , ${password}`)

        //compare passwords
        const passwordMatch = await bcrypt.compare(password, admin.password)
        console.log(`passwordMatch : ${passwordMatch}`)

        if (passwordMatch) {
            const myToken = jwt.sign({
                id: admin._id
            }, process.env.JWT_ADMIN_PASSWORD)

            

            console.log(`:: my token is : ${myToken}`)
            
            return res.json({ msg: 'Signin successful', token: myToken })
        }
        else {
            res.json({ msg: 'fsail in password Match, invalid password' })
        }

    } catch (e) {
        console.log(e)
    }


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