const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth")

// Send Connection Request
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
        const user = req.profileData;
        res.send(`${user.firstName} send connection request`);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = { requestRouter }