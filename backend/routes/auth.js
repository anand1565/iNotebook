const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { isError } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "anandkumar";


//Route 1: Create a User using: POST '/api/auth/createuser" . Doesn't require Authentication // No login requiredf

router.post('/createuser', [
    body('name', "Enter name with minimum 3 characters").isLength({ min: '3' }),
    body('email', "Email should be unique").isEmail(),
    body('password', 'password should be of minimum 6 characters').isLength({ min: '6' })
], async (req, res) => {
    let success = false;
    // If there are errors , return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether the user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false;
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }
        //create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass

        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error");
    }
    // .then(user => res.json(user)).catch((err) =>{console.log(err)
    //     res.json({ error: "Please enter a valid email address",message:err.message })
    // });

})

// Route 2:  Authenticate a User using: POST '/api/auth/login" . No login requiredf

router.post('/login', [
    body('email', "Email should be unique").isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    // If there are errors , return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            let success = false;
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error = error.message;
        res.status(500).send("Internal server error");

    }
})

// Route3: Get loggedIn User details using: POST '/api/auth/getuser" . Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = await req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error = error.message;
        res.status(500).send("Internal server error");
    }
})

module.exports = router;
