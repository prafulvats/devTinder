const express = require("express");
const { userAuth } = require("../middleware/auth")
const { User } = require("../models/user")


const profileRouter = express.Router();

//Get all users
profileRouter.get('/allProfiles', async(req, res) => {
    try {
        const usersList = await User.find({});
        res.send(usersList);
    } catch (err) {
        res.send("Error while feching data");
    }
})

//Get profile
profileRouter.get("/profile", userAuth, async(req, res) => {
    try {
        const user = req.profileData;
        res.send(user);
    } catch (error) {
        res
            .status(400)
            .send(error.message);
    }
})

module.exports = {
    profileRouter
}