const express = require("express");
const { validateSignUp } = require("../utils/helper");
const bcrypt = require("bcrypt");
const { User } = require("../models/user")

const authRouter = express.Router();

//SignUp User
authRouter.post('/signUp', async (req, res) => {
    // Creating instance of model
    // const users = new User(req.body); 
    try {
        validateSignUp(req);
        const { firstName, lastName, email, password } = req.body;
        //Hashing a password (Encryption using bcrypt library)
        const passwordhash = await bcrypt.hash(password, 10);
        await User({firstName, lastName, email, password: passwordhash}).save();
        res.send("Data saved successfully");
    } catch(err) {
        console.log(err.message, "message")
        res.status(400).send(err.message);
    }
})
//SignIn User
authRouter.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Invalid Credentials");
        } else {
            // const validPassword = await bcrypt.compare(password, user.password);
            const validPassword = await user.validatePassword(password);
            if(validPassword) {
                //Create a JWT token
                // const token = await jwt.sign({ _id: user._id}, "Nike@12345", { expiresIn: '1h' }) // Hiding the userId in token , Secret Key at server only. Add Token Expiry
                const token = await user.getJWT();
                //Setting token with Expiry
                res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                res.send('Login Successfull');
            } else {
                throw new Error("Invalid Credentials");
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

authRouter.post('/logout', async (req, res) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now())
    }).send("Logout Successfull")
})

module.exports = { authRouter };