const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateProfileUpdate, validationForChangePassword } = require("../utils/helper");
const { User } = require("../models/user")


const profileRouter = express.Router();

//Get all users
profileRouter.get('/allProfiles', userAuth,  async(req, res) => {
    try {
        const usersList = await User.find({});
        res.send(usersList);
    } catch (err) {
        res.send("Error while feching data");
    }
})

//Get profile
profileRouter.get("/profile/view", userAuth, async(req, res) => {
    try {
        const user = req.profileData;
        res.send(user);
    } catch (error) {
        res
            .status(400)
            .send(error.message);
    }
})

//Update profile
profileRouter.patch("/profile/update", userAuth, async(req, res) => {
    try {
        validateProfileUpdate(req.body);
        const { body, profileData } = req;
        const { _id } = profileData;
        const mergeProfileData = { ...profileData.toObject(), ...body };
        //Update profile data in DB
        const updateProfileData = await User.findByIdAndUpdate(_id, mergeProfileData, {new: true});
        res.json({
            message: "Profile updated successfully!",
            updateProfileData
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Update password
profileRouter.patch("/profile/password", userAuth, async(req, res) => {
    try {
        validationForChangePassword(req);
        res.send("Data saved successfully");
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = {
    profileRouter
}