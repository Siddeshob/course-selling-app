const { Router } = require('express');
const userRoutes = Router();
const { userModel } = require("../DB/db");
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

userRoutes.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = signupSchema.parse(req.body);
        const hashPassword = await bcrypt.hash(password, 5);

        await userModel.create({
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



userRoutes.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        //find user
        const user = await userModel.findOne({ email: email })
        if (!user) {
            res.json({ msg: `user not found` })
        } else {

            console.log(`user fron db is : ${user}`)
        }

        //is user not exist throw error msg
        console.log(`sign in cridenciles are : ${email} , ${password}`)

        //compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password)
        console.log(`passwordMatch : ${passwordMatch}`)

        if (passwordMatch) {
            const myToken = jwt.sign({
                id: user._id
            }, process.env.JWT_USER_PASSWORD)

            

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

userRoutes.get('/purchases', (req, res) => {
    res.json({
        msg: 'my purchases...................'
    })
})

module.exports = {
    userRoutes: userRoutes
}

