const { Router } = require('express')
const adminRouter = Router()
const { adminModel, courseModel } = require('../DB/db')
const z = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require('../middleware/admin');

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

adminRouter.post('/coures', adminMiddleware, async (req, res) => {
    const adminId = req.adminId
    console.log(`......adminId : ${adminId}`)
    const { title, description, price, imageURL, createrId } = req.body

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageURL: imageURL,
        createrId: adminId
    })
    console.log(course)
    res.json({
        msg: "course is created.....",
        courseId: course._id
    })
})
adminRouter.put('/coures', adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        const { _id, title, description, price, imageURL } = req.body;

        const result = await courseModel.updateOne(
            {
                _id: _id,
                createrId: adminId,  // ✅ Only update if admin owns the course
            },
            {
                title,
                description,
                price,
                imageURL,
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ msg: "Course not found or not authorized." });
        }

        res.json({ msg: "Course updated successfully." });
    } catch (e) {
        console.log("Error updating course:", e);
        res.status(500).json({ msg: "Internal server error" });
    }
});


adminRouter.get('/coures/bulk', adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        console.log("**************Admin ID from middleware:", req.adminId);

        const courses = await courseModel.find({
            createrId: adminId
        });

        res.json({
            msg: "Courses fetched successfully",
            courses
        });
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = {
    adminRouter: adminRouter
}