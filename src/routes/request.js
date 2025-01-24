const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { User } = require("../models/user")
const ConnectionRequest = require('../models/connectionRequest');

// Send Connection Request
requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {
    try {
        const user = req.profileData;
        const fromUserId = req.profileData._id;
        const { userId, status } = req.params;
        // Validation for random userId
        const userExist = await User.findById(userId);
        if(!userExist) {
            throw new Error(`User does not exist`);
        }
        // Validation for status it should be only ignored and interested
        const allowedStatus = ['ignored', 'interested'];
        if(!allowedStatus.includes(status)) {
            throw new Error(`Status invalid - ${status}`);
        }
        //Check if there is an existing connection request
        const existingConnRequest = await ConnectionRequest.findOne({
            $or: [
                {
                    fromUserId,
                    toUserId: userId
                },
                {
                    fromUserId: userId, toUserId: fromUserId
                }
            ]
        })
        if(existingConnRequest) {
            throw new Error(`Already exist`);
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId:userId , status
        })
        const data = await connectionRequest.save();
        res.json({
            message: `${user.firstName} ${status} ${userExist.firstName}`,
            data
        }) 
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

requestRouter.post("/request/review/:status/:userId", userAuth, async (req, res) => {
    try {
        const user = req.profileData;
        const fromUserId = req.profileData._id;
        const { userId, status } = req.params;
    } catch (error) {
        
    }
})

module.exports = { requestRouter }