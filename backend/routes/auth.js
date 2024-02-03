const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
var fetchuser = require("../middleware/fetchuser")

const { body, validationResult } = require("express-validator")

// Middleware to parse incoming JSON requests
router.use(express.json())

//json web token secret
const JWT_SECRET = "sujithmakam$joshnareddy"

// Route:1 Creating user using POST "api/auth/createuser". No login requires
router.post(
    "/createuser",
    [
        body("email").isEmail(),
        body("name").isLength({ min: 3 }),
        body("password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        //If there are errors, return Bad Request and errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //check whether the email exist already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({
                    error: "sorry a user with this email already exists",
                })
            }
            //creating a salt
            const salt = await bcrypt.genSalt(10)

            secPassword = await bcrypt.hash(req.body.password, salt)

            //create new user
            user = await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
            })

            // .then(user => res.json(user))
            // .catch(err=>{console.log(err)
            // res.json({error:'please enter a unique value for email', message:err.message})})

            //data
            const Data = {
                // we will use id for faster retrival of information
                user: {
                    id: user.id,
                },
            }

            const authToken = jwt.sign(Data, JWT_SECRET)
            //console.log(jwtData);

            success = true
            res.json({ success, authToken })
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
        }
    },
)

// Route:2 Authenticating a user using :POST "api/auth/login". No login required
router.post(
    "/login",
    [
        body("email", "enter a valid email").isEmail(),
        body("password", "cannot be empty").exists(),
    ],
    async (req, res) => {
        let success = false
        // If there are errors, return Bad Request and errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Getting email and password from user
        const { email, password } = req.body

        try {
            // Checking whether the email exists or not
            let user = await User.findOne({ email })

            if (!user) {
                return res
                    .status(404)
                    .json({
                        success,
                        error: "Please enter correct credentials",
                    })
            }

            // Comparing the user-entered password with the hashed password stored in the database
            const passwordCompare = await bcrypt.compare(
                password,
                user.password,
            )
            // console.log(password);
            // console.log(passwordCompare);

            if (!passwordCompare) {
                success = false
                return res.status(404).json({
                    success,
                    error: "Please enter correct credentials",
                })
            }

            // If login credentials are correct, generate and send a token
            const payload = {
                user: {
                    id: user.id,
                },
            }
            // Sign JWT token
            const authToken = jwt.sign(payload, JWT_SECRET)

            success = true
            res.json({ success, authToken })
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
        }
    },
)

// Route:3 Getting Loggedin User Details using : POST "api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router
